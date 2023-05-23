import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
// export class paymentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

export class paymentComponent implements OnInit {
  busy = false;
  cardNo = '';
  cardHolder='';
  amountTrxn='';
  currencyCode='';
  error = false;
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
 
  }
  onSubmit() {
    if (!this.cardNo) {
      return;
    }
    this.busy = true;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    console.log(this.cardNo)
    console.log(this.cardHolder)
    console.log(this.amountTrxn)
    console.log(this.currencyCode)



    // this.authService
    //   .login(this.cardNo, this.password)
    //   .pipe(finalize(() => (this.busy = false)))
    //   .subscribe(
    //     () => {
    //       this.router.navigate([returnUrl]);
    //     },
    //     () => {
    //       this.loginError = true;
    //     }
    //   );
  }
}
