import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuthorInfoComponent } from './post-author-info.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserInfoModule } from 'src/app/shared/components/user-info';
import { SocialShareModalModule } from 'src/app/shared/components/social-share-modal';
import { SubscribeBtnModule } from 'src/app/shared/components/subscribe-btn';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';
import { RouterModule } from '@angular/router';
import {SocialShareModule} from '../social-share';


@NgModule({
  declarations: [PostAuthorInfoComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    UserInfoModule,
    SocialShareModalModule,
    SubscribeBtnModule,
    AuthCheckModule,
    RouterModule,
    SocialShareModule
  ],
  exports: [PostAuthorInfoComponent]
})
export class PostAuthorInfoModule { }
