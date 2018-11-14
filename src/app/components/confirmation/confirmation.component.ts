import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  paypalId;
  transactionId;
  error = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.paypalId = this.activeRoute.snapshot.params.id; 

    this.transactionService.confirmMemberTransaction(this.paypalId).subscribe((data: any) => {
      if(data.success){
        this.transactionId = data.confirmation
      } else {
        this.error = true;
      }
    });
  }

}
