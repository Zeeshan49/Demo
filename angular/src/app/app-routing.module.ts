import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DemoApisComponent } from './demo-apis/demo-apis.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'demo-apis', component: DemoApisComponent, canActivate: [AuthGuard] },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.paymentModule),
    // canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
