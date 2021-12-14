import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePollComponent } from './create-poll.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePollComponent,
    data: {
      meta: {
        title: 'Poll Studio | Newsreel'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePollRoutingModule { }
