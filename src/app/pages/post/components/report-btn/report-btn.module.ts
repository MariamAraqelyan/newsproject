import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportBtnComponent } from './report-btn.component';

import { MatButtonModule } from '@angular/material/button';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [ReportBtnComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AuthCheckModule
  ],
  exports: [ReportBtnComponent]
})
export class ReportBtnModule { }
