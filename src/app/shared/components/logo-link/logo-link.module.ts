import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoLinkComponent } from './logo-link.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LogoLinkComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LogoLinkComponent]
})
export class LogoLinkModule { }
