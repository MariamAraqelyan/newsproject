import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCheckDirective } from './auth-check.directive';

import { AuthModalModule } from 'src/app/shared/components/auth-modal';


@NgModule({
  declarations: [AuthCheckDirective],
  imports: [
    CommonModule,
    AuthModalModule
  ],
  exports: [AuthCheckDirective]
})
export class AuthCheckModule { }
