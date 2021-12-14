import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';

import { RouterModule } from '@angular/router';
import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';
import { VideoFacadeModule } from 'src/app/shared/components/video-facade';


@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostAuthorInfoModule,
    PostHeaderInfoModule,
    VideoFacadeModule
  ],
  exports: [ArticleComponent]
})
export class ArticleModule { }
