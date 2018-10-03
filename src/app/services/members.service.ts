import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  uri = 'http://localhost:4100/members';

  constructor(private http: HttpClient) { }

  getMembersList() {
    return this
           .http
           .get(`${this.uri}`);
  }

  getMember(member_id) {
    return this
           .http
           .get(`${this.uri}/${member_id}`);
  }

  addMember(member) {
    return this
           .http
           .post(`${this.uri}/add`, member)
           .toPromise();
  }

  updateMember(member) {
    return this
           .http
           .post(`${this.uri}/update`, member);
  }

  deleteMember(member_id) {
    return this
      .http
      .get(`${this.uri}/delete/${member_id}`);
  }
}
