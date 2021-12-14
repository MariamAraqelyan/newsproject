import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateMemeComponent } from './create-meme.component';

const routes: Routes = [
  {
    path: '',
    component: CreateMemeComponent,
    data: {
      meta: {
        title: 'Meme Studio | Newsreel'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateMemeRoutingModule { }
