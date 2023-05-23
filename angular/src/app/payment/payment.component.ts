import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PaymentService } from '../core';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DropDownList } from '../core/models/DropDownList';
import { Payment, PaymentResponse } from '../core/models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
// export class paymentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }


export class paymentComponent implements OnInit, OnDestroy {
  busy = false;
  error = false;
  isSubmit = false;

  cardNo = 4712345601012222;
  cardHolder = 'Ahmed Mohamed';
  amountTrxn = 1000;
  currencyCode = 'USD';

  //only to Show Response
  responseCode = '';
  message = '';
  approvalCode = '';
  dateTime = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) { }
  ngOnInit(): void {
    this.isSubmit = false;
  }

  ngOnDestroy(): void {
    this.isSubmit = false;
  }
  onSubmit() {
    if (!this.cardNo) {
      return;
    }
    this.busy = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    // const payment: Payment = {
    //   cardNo: this.cardNo,
    //   cardHolder: this.cardHolder,
    //   amountTrxn: this.amountTrxn,


    //   currencyCode: getCrrencyCode(this.currencyCode),
    //   processingCode: getProcessingCode(),
    //   systemTraceNr: getSystemTraceNr(),
    //   functionCode: getFunctionCode()
    // };
    // console.log(payment)
    this.paymentService
      .SavePayment(this.cardNo, this.cardHolder, this.amountTrxn,
        getCrrencyCode(this.currencyCode), getProcessingCode(), getSystemTraceNr(), getFunctionCode())

      .pipe(finalize(() => (this.busy = false)))
      .subscribe(
        (res: PaymentResponse) => {
          console.log(res)
          if (res.message === "Success") {
            this.isSubmit = true
            this.responseCode = res.responseCode,
              this.approvalCode = res.approvalCode,
              this.dateTime = res.dateTime,
              this.message = res.message
            // this.router.navigate([returnUrl]);
          }
        },
        () => {
          this.error = true;
        }
      );
  }


  CurrencyList: DropDownList[] = [
    { code: "AFN", text: "Afghanistan Afghanis – AFN" },
    { code: "USD", text: "United States Dollars – USD" }
  ]
}

const getCrrencyCode = (code: string) => {
  return 840
}

const getProcessingCode = () => {
  return 999000
}

const getSystemTraceNr = () => {
  return 36
}

const getFunctionCode = () => {
  return 1324
}