import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobArticleComponent } from './mob-article.component';

import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';


@NgModule({
  declarations: [MobArticleComponent],
  imports: [
    CommonModule,
    PostAuthorInfoModule,
    PostHeaderInfoModule
  ],
  exports: [MobArticleComponent]
})
export class MobArticleModule { }
