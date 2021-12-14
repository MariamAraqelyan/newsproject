import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPagesMenuComponent } from './legal-pages-menu.component';

import { RouterModule } from '@angular/router';
import { AllowForRolesModule } from 'src/app/shared/directives/allow-for-roles';

@NgModule({
  declarations: [LegalPagesMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    AllowForRolesModule
  ],
  exports: [LegalPagesMenuComponent]
})
export class LegalPagesMenuModule { }
