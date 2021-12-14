import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideNavbarComponent } from './aside-navbar.component';

import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AllowForRolesModule } from 'src/app/shared/directives/allow-for-roles';


@NgModule({
  declarations: [AsideNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    AllowForRolesModule
  ],
  exports: [AsideNavbarComponent]
})
export class AsideNavbarModule { }
