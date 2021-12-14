import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
    data: {
      meta: {
        title: 'Forgot Password | Newsreel',
        description: 'Login/signup to your newsreel account to engage on the world\'s first crowdsourced news platform where news is created and rated by the people for the people.'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
