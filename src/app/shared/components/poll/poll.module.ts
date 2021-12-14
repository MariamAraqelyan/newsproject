import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent } from './poll.component';

import { RouterModule } from '@angular/router';
import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [PollComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostAuthorInfoModule,
    PostHeaderInfoModule,
    MatRadioModule,
    ReactiveFormsModule,
    AuthCheckModule
  ],
  exports: [PollComponent]
})
export class PollModule { }
