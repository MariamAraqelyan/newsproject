import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteReviewComponent } from './write-review.component';

import { ReviewUserResolverService } from './resolvers/user';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: WriteReviewComponent,
        resolve: {
          user: ReviewUserResolverService
        },
        data: {
          meta: {
            title: 'Write Review | Newsreel'
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteReviewRoutingModule { }
