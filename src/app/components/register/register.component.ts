import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { MembersService } from '../../services/members.service';
import { LeagueService } from '../../services/league.service';
import { ItemService } from '../../services/item.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  step = 1;
  total = 0;
  jerseyDepositItem;

  member: any = {};
  membershipType = 1;
  membershipItem: any = { item_price: 0 };
  memberAccept = false;

  items;
  leagueItems = [];
  leagues;
  leaguesControls;
  controls;

  league: any = {};
  detailsForm: FormGroup;
  membershipForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membersService: MembersService,
    private leagueService: LeagueService,
    private itemService: ItemService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    this.createForm();
  }

  ngOnInit() {
    forkJoin(
      this.itemService.getItemsList(),
      this.leagueService.getLeaguesList()
    ).subscribe(([items, leagues]) => {
      this.items = items;
      this.leagues = leagues;
      this.jerseyDepositItem = this.items.find(item => {
        return item.item_id == 6;
      })
    })
  }

  createForm() {
    this.detailsForm = this.fb.group({
      member_fname: ['', Validators.required],
      member_lname: ['', Validators.required],
      member_pri_email: ['', Validators.required],
      member_password: ['', Validators.required]
    });
    this.membershipForm = this.fb.group({
      membershipTypeRadio: ['', Validators.required],
      memberAcceptCheckbox: ['', Validators.required]
    });
  }

  registerMember() {
    let cart = [];

    this.leagueItems.forEach(league => {
      cart.push(league.position.item_id)

      if(league.jerseyDeposit){
        cart.push(league.jerseyDeposit)
      }
    })

    if(this.membershipItem.item_id) {
      cart.push(this.membershipItem.item_id)
    }

    let data = {
      cart: cart,
      member: this.member
    }

    this.registerService.registerMember(data)
      .subscribe(res => {
        console.log(res);
        this.ngxSmartModalService.getModal('confirmModal').open()
      });
  }

  prepareDetails() {
    this.step += 1;
  }

  prepareMembership() {
    this.membershipItem = this.items.find(item => {
      return item.item_id == this.membershipType;
    })

    this.total = this.membershipItem.item_price;

    this.step += 1;
  }

  prepareLeague() {
    this.total = this.membershipItem.item_price;
    this.leagueItems.forEach(league => {
      this.total += league.position.item_price;

      if (league.jerseyDeposit) {
        this.total += this.jerseyDepositItem.item_price;
      }
    })
    this.step += 1;
  }

  back() {
    this.step -= 1;
  }

  toggleLeagueItem(league, positionItem) {
    let index = this.leagueItems.findIndex(item => {
      return item.league_id == league.league_id;
    });

    if (index === -1) {
      let leagueItem = {
        league_desc: league.league_desc,
        league_id: league.league_id,
        league_level: league.league_level,
        league_name: league.league_name,
        position: positionItem
      }

      if (this.jerseyDepositItem) {
        leagueItem['jerseyDeposit'] = this.jerseyDepositItem.item_id;
      }

      this.leagueItems.push(leagueItem);
    } else {
      this.leagueItems.splice(index, 1)
    }
  }
}
