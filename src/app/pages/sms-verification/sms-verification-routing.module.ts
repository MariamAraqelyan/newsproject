import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsVerificationComponent } from './sms-verification.component';

const routes: Routes = [
  {
    path: '',
    component: SmsVerificationComponent,
    data: {
      meta: {
        title: 'SMS Verification | Newsreel'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsVerificationRoutingModule { }
