import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudioRoutingModule } from './studio-routing.module';
import { StudioComponent } from './studio.component';

import { MatTabsModule } from '@angular/material/tabs';
import { AddVideoModule } from './components/add-video';
import { AddImageModule } from './components/add-image';
import { MobHeaderModule } from 'src/app/shared/components/mob-header';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [StudioComponent],
  imports: [
    CommonModule,
    StudioRoutingModule,
    MatTabsModule,
    AddVideoModule,
    AddImageModule,
    MobHeaderModule,
    DesktopHeaderModule,
    RouterModule
  ]
})
export class StudioModule { }
