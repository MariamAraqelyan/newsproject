import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisingOpportunitiesRoutingModule } from './advertising-opportunities-routing.module';
import { AdvertisingOpportunitiesComponent } from './advertising-opportunities.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';
import { LegalPageNavbarModule } from 'src/app/shared/components/legal-page-navbar';


@NgModule({
  declarations: [AdvertisingOpportunitiesComponent],
  imports: [
    CommonModule,
    AdvertisingOpportunitiesRoutingModule,
    RouterModule,
    MatCardModule,
    DesktopHeaderModule,
    LegalPageNavbarModule
  ]
})
export class AdvertisingOpportunitiesModule { }
