import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Member } from '../../types/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  step = 'detail';
  member: any = {};
  membership: any = {};
  league: any = {};
  detailsForm: FormGroup;
  membershipForm: FormGroup;
  leagueForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membersService: MembersService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.detailsForm = this.fb.group({
      member_fname: ['', Validators.required],
      member_lname: ['', Validators.required],
      member_pri_email: ['', Validators.required],
      member_password: ['', Validators.required]
    });
    this.membershipForm = this.fb.group({
      membershipType: ['', Validators.required],
      memberAccept: ['', Validators.required]
    });
    this.leagueForm = this.fb.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createMember() {
    this.membersService.addMember(this.member)
      .then(res => {
        console.log(res);
        this.router.navigate(['']);
      });
  }

  prepareDetails() {
    this.step = 'membership';
  }

  prepareMembership() {
    this.step = 'league';
  }

  prepareLeague() {
    this.step = 'confirm';
  }
}
