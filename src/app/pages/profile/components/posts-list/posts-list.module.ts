import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list.component';

import { PsaModule } from 'src/app/shared/components/psa';
import { PollModule } from 'src/app/shared/components/poll';
import { MemeModule } from 'src/app/shared/components/meme';
import { TweetModule } from 'src/app/shared/components/tweet';
import { ArticleModule } from 'src/app/shared/components/article';
import { AnimatedSpinnerModule } from 'src/app/shared/components/animated-spinner';


@NgModule({
  declarations: [PostsListComponent],
  imports: [
    CommonModule,
    ArticleModule,
    PsaModule,
    PollModule,
    MemeModule,
    TweetModule,
    AnimatedSpinnerModule
  ],
  exports: [PostsListComponent]
})
export class PostsListModule { }
