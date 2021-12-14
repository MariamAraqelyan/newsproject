import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';
import { LegalPageNavbarModule } from 'src/app/shared/components/legal-page-navbar';


@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    RouterModule,
    MatCardModule,
    DesktopHeaderModule,
    LegalPageNavbarModule
  ]
})
export class HelpModule { }
