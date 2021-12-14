import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteReviewRoutingModule } from './write-review-routing.module';
import { WriteReviewComponent } from './write-review.component';

import { ReviewWrapperModule } from './components/review-wrapper';

@NgModule({
  declarations: [WriteReviewComponent],
  imports: [
    CommonModule,
    WriteReviewRoutingModule,
    ReviewWrapperModule
  ]
})
export class WriteReviewModule { }
