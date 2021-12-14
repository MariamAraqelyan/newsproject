import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsOfServiceRoutingModule } from './terms-of-service-routing.module';
import { TermsOfServiceComponent } from './terms-of-service.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';
import { LegalPageNavbarModule } from 'src/app/shared/components/legal-page-navbar';

@NgModule({
  declarations: [TermsOfServiceComponent],
  imports: [
    CommonModule,
    TermsOfServiceRoutingModule,
    RouterModule,
    MatCardModule,
    DesktopHeaderModule,
    LegalPageNavbarModule
  ]
})
export class TermsOfServiceModule { }
