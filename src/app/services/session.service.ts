import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  uri = 'http://localhost:4100/session';

  constructor(private http: HttpClient) { }

  login(member) {
    return this
           .http
           .post(`${this.uri}/login`, member);
  }

  getRole() {
    return this
           .http
           .get(`${this.uri}/role`);
  }
}
