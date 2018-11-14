import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions;

  constructor(
    private transactionService: TransactionService,
    private router: Router
    ) { }

  ngOnInit() {
    this.transactionService.getMemberTransactions()
      .subscribe(trans => {
        this.transactions = trans;
      })
  }

  payTransaction(id) {
    this.router.navigate([`payment/${id}`]);
  }

}
