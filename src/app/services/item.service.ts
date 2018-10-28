import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  uri = 'http://localhost:4100/item';

  constructor(private http: HttpClient) { }

  getItemsList() {
    return this
           .http
           .get(`${this.uri}`);
  }
}
