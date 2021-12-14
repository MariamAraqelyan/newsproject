import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ProfileMainInfoModule } from './components/profile-main-info';
import { ProfileStatsInfoModule } from './components/profile-stats-info';
import { PostsListModule } from './components/posts-list';
import { ReviewsInfoModule } from './components/reviews-info';
import { ReviewsListModule } from './components/reviews-list';
import { ReviewsModalModule } from './components/reviews-modal';
import { EditProfileModalModule } from './components/edit-profile-modal';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    ProfileMainInfoModule,
    ProfileStatsInfoModule,
    PostsListModule,
    ReviewsInfoModule,
    ReviewsListModule,
    ReviewsModalModule,
    EditProfileModalModule,
    AuthCheckModule
  ]
})
export class ProfileModule { }
