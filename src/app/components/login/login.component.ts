import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Member } from '../../types/member';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  member: any = {};
  angForm: FormGroup;
  locked: boolean = false;
  incorrect: boolean = false;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      member_pri_email: ['', Validators.required ],
      member_password: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  login() {
    this.incorrect = false;
    this.locked = false;
    this.sessionService.login(this.member)
      .subscribe((res: any) => {
        if(res.success) {
          localStorage.setItem('access_token', res.access_token);
          this.router.navigate(['/profile']);
        } else if(res.error == 'LOGIN_FAILED') {
          this.incorrect = true;
        } else if(res.error == 'ACCOUNT_LOCKED') {
          this.locked = true;
        }
    });
 }
}
