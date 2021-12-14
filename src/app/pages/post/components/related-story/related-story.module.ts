import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedStoryComponent } from './related-story.component';

import { RouterModule } from '@angular/router';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';
import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';



@NgModule({
  declarations: [RelatedStoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostHeaderInfoModule,
    PostAuthorInfoModule
  ],
  exports: [RelatedStoryComponent]
})
export class RelatedStoryModule { }
