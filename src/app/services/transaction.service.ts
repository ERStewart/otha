import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  uri = 'http://localhost:4100/transaction';

  constructor(private http: HttpClient) { }

  getMemberTransactions() {
    return this
           .http
           .get(`${this.uri}/member`);
  }

  confirmMemberTransaction(id) {
    return this
           .http
           .post(`${this.uri}/member`, {paypalId: id});
  }

  getMemberTransaction(id) {
    return this
           .http
           .get(`${this.uri}/get-one/${id}`);
  }
}
