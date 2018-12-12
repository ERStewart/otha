import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  uri = 'http://localhost:4100/season';

  constructor(private http: HttpClient) { }

  getOpenSeasons() {
    return this
           .http
           .get(`${this.uri}/open`);
  }
}
