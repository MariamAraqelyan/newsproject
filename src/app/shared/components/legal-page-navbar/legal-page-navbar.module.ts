import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPageNavbarComponent } from './legal-page-navbar.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LegalPageNavbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LegalPageNavbarComponent]
})
export class LegalPageNavbarModule { }
