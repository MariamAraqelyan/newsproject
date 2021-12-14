import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTabRoutingModule } from './create-tab-routing.module';
import { CreateTabComponent } from './create-tab.component';

import { MatTabsModule } from '@angular/material/tabs';
import { CreateArticleModule } from './../create-article';
import { CreateMemeModule } from './../create-meme';
import { CreatePollModule } from './../create-poll';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CreateTabComponent],
  imports: [
    CommonModule,
    CreateTabRoutingModule,
    MatTabsModule,
    CreateArticleModule,
    CreateMemeModule,
    CreatePollModule,
    RouterModule
  ]
})
export class CreateTabModule { }
