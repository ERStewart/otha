import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Member } from '../../types/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  member: any = {};
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
      member_pri_email: ['', Validators.required ],
      member_password: ['', Validators.required ]
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
}
