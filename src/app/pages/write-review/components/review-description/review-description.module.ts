import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewDescriptionComponent } from './review-description.component';

import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'src/app/shared/components/star-rating';


@NgModule({
  declarations: [ReviewDescriptionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    StarRatingModule
  ],
  exports: [ReviewDescriptionComponent]
})
export class ReviewDescriptionModule { }
