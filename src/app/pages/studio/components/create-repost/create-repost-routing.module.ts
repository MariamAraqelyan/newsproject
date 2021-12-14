import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRepostComponent } from './create-repost.component';

const routes: Routes = [
  {
    path: '',
    component: CreateRepostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRepostRoutingModule { }
