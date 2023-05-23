import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from '../models/application-user';
import { environment } from 'src/environments/environment';
import { Payment, PaymentResponse } from '../models/payment'
import { RSAHelper } from 'src/app/core/utilities/rsaHelper';
import { AESHelper } from 'src/app/core/utilities/aesHelper';

@Injectable({
    providedIn: 'root',
})

export class PaymentService implements OnDestroy {
    private readonly apiUrl = `${environment.apiUrl}api/payment`;
    private timer: Subscription | null = null;
    private _pay = new BehaviorSubject<PaymentResponse | null>(null);
    pay$ = this._pay.asObservable();


    constructor(private router: Router, private http: HttpClient, private rsaHelper: RSAHelper, private aesHelper: AESHelper) { }

    ngOnDestroy(): void { }

    SavePayment(cardNo: any, cardHolder: any, amountTrxn: any,
        currencyCode: any, processingCode: any, systemTraceNr: any,
        functionCode: any) {

        const payment = {
            CardNo: cardNo,
            CardHolder: cardHolder,
            AmountTrxn: amountTrxn,
            CurrencyCode: currencyCode,
            ProcessingCode: processingCode,
            SystemTraceNr: systemTraceNr,
            FunctionCode: functionCode,
        }

        //AES excryption
        const aesKeyValue = this.aesHelper.aesKey();
        const encJsonPayment = this.aesHelper.encrypt(JSON.stringify(payment));
        //End
        return this.http
            .post<PaymentResponse>(`${this.apiUrl}/SavePayment`,
                { data: encJsonPayment, aesKey: aesKeyValue })
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