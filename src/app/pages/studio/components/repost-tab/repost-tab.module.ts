import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepostTabRoutingModule } from './repost-tab-routing.module';
import { RepostTabComponent } from './repost-tab.component';

import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [RepostTabComponent],
  imports: [
    CommonModule,
    RepostTabRoutingModule,
    MatTabsModule
  ]
})
export class RepostTabModule { }
