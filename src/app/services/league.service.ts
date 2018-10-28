import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  uri = 'http://localhost:4100/league';

  constructor(private http: HttpClient) { }

  getLeaguesList() {
    return this
           .http
           .get(`${this.uri}`);
  }
}
