import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentComponent } from './post-comment.component';

import { UserInfoModule } from 'src/app/shared/components/user-info';
import { TimeAgoModule } from 'src/app/shared/pipes/time-ago';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [PostCommentComponent],
  imports: [
    CommonModule,
    UserInfoModule,
    TimeAgoModule,
    ReactiveFormsModule,
    MatButtonModule,
    AuthCheckModule
  ],
  exports: [PostCommentComponent]
})
export class PostCommentModule { }
