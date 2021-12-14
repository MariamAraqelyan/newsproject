import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineNavbarComponent } from './inline-navbar.component';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [InlineNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [InlineNavbarComponent]
})
export class InlineNavbarModule { }
