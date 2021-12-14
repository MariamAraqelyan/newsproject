import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsThreadComponent } from './comments-thread.component';

import { PostCommentModule } from './../post-comment';
import { MatButtonModule } from '@angular/material/button';
import { AnimatedSpinnerModule } from 'src/app/shared/components/animated-spinner';


@NgModule({
  declarations: [CommentsThreadComponent],
  imports: [
    CommonModule,
    PostCommentModule,
    MatButtonModule,
    AnimatedSpinnerModule
  ],
  exports: [CommentsThreadComponent]
})
export class CommentsThreadModule { }
