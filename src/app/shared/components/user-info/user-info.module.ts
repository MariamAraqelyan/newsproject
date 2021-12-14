import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';


import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'src/app/shared/components/star-rating';


@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    StarRatingModule
  ],
  exports: [UserInfoComponent]
})
export class UserInfoModule { }
