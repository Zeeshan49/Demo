import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from '../models/application-user';
import { environment } from 'src/environments/environment';
import { Payment, PaymentResponse } from '../models/payment'

// interface LoginResult {
//     username: string;
//     role: string;
//     originalUserName: string;
//     accessToken: string;
// }

@Injectable({
    providedIn: 'root',
})

export class PaymentService implements OnDestroy {
    private readonly apiUrl = `${environment.apiUrl}api/payment`;
    private timer: Subscription | null = null;
    private _pay = new BehaviorSubject<PaymentResponse | null>(null);
    pay$ = this._pay.asObservable();


    constructor(private router: Router, private http: HttpClient) { }

    ngOnDestroy(): void { }

    SavePayment(
        cardNo: any, cardHolder: any, amountTrxn: any, currencyCode: any, processingCode: any, systemTraceNr: any, functionCode: any) {
        return this.http
            .post<PaymentResponse>(`${this.apiUrl}/SavePayment`, { cardNo, cardHolder, amountTrxn, currencyCode, processingCode, systemTraceNr, functionCode })
            .pipe(
                map((x) => {
                    this._pay.next({
                        responseCode: x.responseCode,
                        approvalCode: x.approvalCode,
                        message: x.message,
                        dateTime: x.dateTime,
                    });
                    return x;
                })
            );
    }
}