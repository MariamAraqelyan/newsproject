import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingSetterComponent } from './star-rating-setter.component';


@NgModule({
  declarations: [StarRatingSetterComponent],
  imports: [
    CommonModule
  ],
  exports: [StarRatingSetterComponent]
})
export class StarRatingSetterModule { }
