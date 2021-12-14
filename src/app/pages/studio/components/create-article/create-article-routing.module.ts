import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleComponent } from './create-article.component';

const routes: Routes = [
  {
    path: '',
    component: CreateArticleComponent,
    data: {
      meta: {
        title: 'Create Post | Newsreel',
        description: 'Create posts on the Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateArticleRoutingModule { }
