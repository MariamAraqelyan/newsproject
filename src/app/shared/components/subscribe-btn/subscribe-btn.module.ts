import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeBtnComponent } from './subscribe-btn.component';

import { MatButtonModule } from '@angular/material/button';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [SubscribeBtnComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthCheckModule
  ],
  exports: [SubscribeBtnComponent]
})
export class SubscribeBtnModule { }
