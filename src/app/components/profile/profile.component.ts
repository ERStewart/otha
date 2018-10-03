import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { Member } from '../../types/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  member: Member;
  angForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membersService: MembersService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      member_fname: ['', Validators.required ],
      member_lname: ['', Validators.required ],
      member_pri_email: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getMember(params['id']);
      } else {
        this.getMember(5);
      }
    })
  }

  getMember(member_id) {
    this.membersService
      .getMember(member_id)
      .subscribe((data: any) => {
      this.member = data;
    });
  }

  updateMember() {
    this.membersService
      .updateMember(this.member)
      .subscribe((data: any) => {
        this.member = data;
    });
  }

}
