import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet.component';

import { RouterModule } from '@angular/router';
import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';


@NgModule({
  declarations: [TweetComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostAuthorInfoModule,
    PostHeaderInfoModule
  ],
  exports: [TweetComponent]
})
export class TweetModule { }
