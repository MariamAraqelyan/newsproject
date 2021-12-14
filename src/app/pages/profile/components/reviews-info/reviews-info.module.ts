import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsInfoComponent } from './reviews-info.component';
import { StarRatingModule } from 'src/app/shared/components/star-rating';


@NgModule({
  declarations: [ReviewsInfoComponent],
  imports: [
    CommonModule,
    StarRatingModule
  ],
  exports: [ReviewsInfoComponent]
})
export class ReviewsInfoModule { }
