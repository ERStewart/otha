import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart  } from '@angular/router';

import { filter } from 'rxjs/operators';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  admin = false;
  member = false;
  token;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
  ) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((res: any) => {
      this.token = localStorage.getItem('access_token');
      if(this.token && !this.member && !this.admin){
        this.sessionService.getRole()
          .subscribe((res: any) => {
            switch(res.member_role_id) {
              case 10:
                this.admin = true;
              case 1:
                this.member = true;
                break;
            }
          });
      }
    });
  }

  ngOnInit() {
  }

}
