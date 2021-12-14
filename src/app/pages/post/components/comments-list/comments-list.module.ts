import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsListComponent } from './comments-list.component';

import { CommentsThreadModule } from './../comments-thread';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoModule } from 'src/app/shared/components/user-info';
import { RouterModule } from '@angular/router';
import { AnimatedSpinnerModule } from 'src/app/shared/components/animated-spinner';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [CommentsListComponent],
  imports: [
    CommonModule,
    CommentsThreadModule,
    MatButtonModule,
    ReactiveFormsModule,
    UserInfoModule,
    RouterModule,
    AnimatedSpinnerModule,
    AuthCheckModule
  ],
  exports: [CommentsListComponent]
})
export class CommentsListModule { }
