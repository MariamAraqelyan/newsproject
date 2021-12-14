import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';

import { PsaModule } from 'src/app/shared/components/psa';
import { PollModule } from 'src/app/shared/components/poll';
import { MemeModule } from 'src/app/shared/components/meme';
import { TweetModule } from 'src/app/shared/components/tweet';
import { ArticleModule } from 'src/app/shared/components/article';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { MatButtonModule } from '@angular/material/button';
import { SocialShareModule } from 'src/app/shared/components/social-share';
import { RelatedStoryListModule } from './components/related-story-list';
import { ReportBtnModule } from './components/report-btn';
import { CommentsListModule } from './components/comments-list';
import { MobArticleModule } from './components/mob-article';


@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    PsaModule,
    PollModule,
    MemeModule,
    TweetModule,
    ArticleModule,
    SpinnerModule,
    MatButtonModule,
    SocialShareModule,
    RelatedStoryListModule,
    ReportBtnModule,
    CommentsListModule,
    MobArticleModule
  ]
})
export class PostModule { }
