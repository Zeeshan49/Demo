import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { paymentComponent } from './payment.component';

const routes: Routes = [{ path: '', component: paymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
