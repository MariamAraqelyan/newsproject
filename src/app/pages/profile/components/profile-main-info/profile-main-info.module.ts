import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMainInfoComponent } from './profile-main-info.component';

import { StarRatingModule } from 'src/app/shared/components/star-rating';

@NgModule({
  declarations: [ProfileMainInfoComponent],
  imports: [
    CommonModule,
    StarRatingModule
  ],
  exports: [ProfileMainInfoComponent]
})
export class ProfileMainInfoModule { }
