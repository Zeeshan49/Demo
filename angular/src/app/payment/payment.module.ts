import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { paymentComponent } from './payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [paymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaymentRoutingModule,
    ReactiveFormsModule
  ]
})
export class paymentModule { }
