import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';

import { RouterModule } from '@angular/router';
import { InlineNavbarModule } from './components/inline-navbar';
import { AsideNavbarModule } from './components/aside-navbar';
import { MobHeaderModule } from 'src/app/shared/components/mob-header';
import { DesktopHeaderModule } from 'src/app/shared/components/desktop-header';


@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    RouterModule,
    MobHeaderModule,
    DesktopHeaderModule,
    AsideNavbarModule,
    InlineNavbarModule
  ]
})
export class MainLayoutModule { }
