import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordConfirmComponent } from './password-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordConfirmComponent,
    data: {
      meta: {
        title: 'Confirm Password Reset | Newsreel'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordConfirmRoutingModule { }
