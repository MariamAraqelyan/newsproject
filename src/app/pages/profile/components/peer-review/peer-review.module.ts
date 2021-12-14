import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerReviewComponent } from './peer-review.component';

import { StarRatingModule } from 'src/app/shared/components/star-rating';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TimeAgoModule } from 'src/app/shared/pipes/time-ago';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthCheckModule } from 'src/app/shared/directives/auth-check';


@NgModule({
  declarations: [PeerReviewComponent],
  imports: [
    CommonModule,
    StarRatingModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    TimeAgoModule,
    ReactiveFormsModule,
    AuthCheckModule
  ],
  exports: [PeerReviewComponent]
})
export class PeerReviewModule { }
