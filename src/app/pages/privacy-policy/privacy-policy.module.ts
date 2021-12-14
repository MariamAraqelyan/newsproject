import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';
import { LegalPageNavbarModule } from 'src/app/shared/components/legal-page-navbar';


@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    RouterModule,
    MatCardModule,
    DesktopHeaderModule,
    LegalPageNavbarModule
  ]
})
export class PrivacyPolicyModule { }
