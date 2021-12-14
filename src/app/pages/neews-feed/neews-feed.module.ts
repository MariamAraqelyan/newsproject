import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeewsFeedRoutingModule } from './neews-feed-routing.module';
import { NeewsFeedComponent } from './neews-feed.component';

import { PsaModule } from 'src/app/shared/components/psa';
import { PollModule } from 'src/app/shared/components/poll';
import { MemeModule } from 'src/app/shared/components/meme';
import { TweetModule } from 'src/app/shared/components/tweet';
import { ArticleModule } from 'src/app/shared/components/article';
import { AnimatedSpinnerModule } from 'src/app/shared/components/animated-spinner';
import {StarRatingModule} from '../../shared/components/star-rating';
import { MobileDialogComponent } from './mobile-dialog/mobile-dialog.component';


@NgModule({
  declarations: [NeewsFeedComponent, MobileDialogComponent],
  imports: [
    CommonModule,
    NeewsFeedRoutingModule,
    AnimatedSpinnerModule,
    PsaModule,
    PollModule,
    MemeModule,
    TweetModule,
    ArticleModule,
    StarRatingModule
  ]
})
export class NeewsFeedModule { }
