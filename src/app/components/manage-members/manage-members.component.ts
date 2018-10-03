import { Component, OnInit } from '@angular/core';
import { Member } from '../../types/member';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {

  members: Member[];
  
  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.getMembersList();
  }

  getMembersList() {
    this.membersService
      .getMembersList()
      .subscribe((data: any) => {
      this.members = data;
    });
  }

  deleteMember(member_id) {
    this.membersService
      .deleteMember(member_id)
      .subscribe((res: any) => {
        if(res.success) {
          this.getMembersList();
        } else {
          console.log(res);
        }
      });
  }

}
