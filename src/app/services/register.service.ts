import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  uri = 'http://localhost:4100/register';

  constructor(private http: HttpClient) { }

  registerMember(data) {
    return this
           .http
           .post(`${this.uri}`, data);
  }
}
