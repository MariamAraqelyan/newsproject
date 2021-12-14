import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportHarmfulContentRoutingModule } from './report-harmful-content-routing.module';
import { ReportHarmfulContentComponent } from './report-harmful-content.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';
import { LegalPageNavbarModule } from 'src/app/shared/components/legal-page-navbar';

@NgModule({
  declarations: [ReportHarmfulContentComponent],
  imports: [
    CommonModule,
    ReportHarmfulContentRoutingModule,
    RouterModule,
    MatCardModule,
    DesktopHeaderModule,
    LegalPageNavbarModule
  ]
})
export class ReportHarmfulContentModule { }
