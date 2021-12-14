import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsModalComponent } from './reviews-modal.component';

import { ReviewWrapperModule } from 'src/app/pages/write-review/components/review-wrapper';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [ReviewsModalComponent],
  imports: [
    CommonModule,
    ReviewWrapperModule,
    MatDialogModule
  ],
  exports: [ReviewsModalComponent]
})
export class ReviewsModalModule { }
