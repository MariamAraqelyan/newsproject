import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopHeaderComponent } from './desktop-header.component';

import { RouterModule } from '@angular/router';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [DesktopHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthCheckModule
  ],
  exports: [DesktopHeaderComponent]
})
export class DesktopHeaderModule { }
