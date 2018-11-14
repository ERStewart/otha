import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewChecked {

  transaction: any;
  grandTotal = 0;

  addScript: boolean = false;
  paypalLoad: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    let transId = this.activatedRoute.snapshot.params.id;
    this.transactionService.getMemberTransaction(transId)
      .subscribe(trans => {
        this.transaction = trans;
        this.grandTotal = this.transaction.transaction_total_amount;
        this.preparePaypal(trans);
      })
  }

  ngAfterViewChecked(): void {

  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  preparePaypal(transaction) {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render({
          // Configure environment
          env: 'sandbox',
          client: {
            sandbox: 'AdPO26N44J7ENP-PcRSrFbJ5b_LTN5Gah0piZZn1qWUkifsc5lCL8Mgs-TfR9PZHeeBec6K4VY27_wTQ',
            production: 'demo_production_client_id'
          },
          // Customize button (optional)
          locale: 'en_US',
          style: {
            size: 'large',
            color: 'gold',
            shape: 'pill',
          },
          // Set up a payment
          payment: function (data, actions) {
            return actions.payment.create({
              transactions: [{
                amount: {
                  total: '' + transaction.transaction_total_amount,
                  currency: 'USD'
                },
                custom: ''+ transaction.transaction_id
              }]
            });
          },
          // Execute the payment
          onAuthorize: function (data, actions) {
            return actions.payment.execute().then(function (payment) {
              console.log(payment)

              window.location.href = `http://localhost:4200/confirmation/${payment.id}`;

              // Show a confirmation message to the buyer
              window.alert('Thank you for your purchase!');
            });
          }
        }, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
}
