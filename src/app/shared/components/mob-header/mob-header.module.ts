import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobHeaderComponent } from './mob-header.component';

import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AllowForRolesModule } from 'src/app/shared/directives/allow-for-roles';
import { LegalPagesMenuModule } from 'src/app/shared/components/legal-pages-menu';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [MobHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    AllowForRolesModule,
    MatBottomSheetModule,
    LegalPagesMenuModule,
    AuthCheckModule
  ],
  exports: [MobHeaderComponent]
})
export class MobHeaderModule { }
