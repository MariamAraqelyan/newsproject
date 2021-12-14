import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsListComponent } from './reviews-list.component';

import { PeerReviewModule } from './../peer-review';
import { SimpleSortingSwitcherModule } from 'src/app/shared/components/simple-sorting-switcher';
import { AnimatedSpinnerModule } from 'src/app/shared/components/animated-spinner';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ReviewsListComponent],
  imports: [
    CommonModule,
    PeerReviewModule,
    SimpleSortingSwitcherModule,
    AnimatedSpinnerModule,
    MatButtonModule
  ],
  exports: [ReviewsListComponent]
})
export class ReviewsListModule { }
