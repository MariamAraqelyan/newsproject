import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateTabComponent } from './create-tab.component';

const routes: Routes = [
  {
    path: '',
    component: CreateTabComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'article'
      },
      {
        path: 'article',
        children: [
          {
            path: '',
            loadChildren: () => import('./../create-article/create-article.module').then((m) => m.CreateArticleModule)
          },
          {
            path: ':slug/edit',
            loadChildren: () => import('./../edit-article/edit-article.module').then((m) => m.EditArticleModule)
          }
        ],
        data: {
          showAdditionalTab: true
        }
      },
      {
        path: 'meme',
        loadChildren: () => import('./../create-meme/create-meme.module').then((m) => m.CreateMemeModule),
        data: {
          showImageUpload: true
        }
      },
      {
        path: 'poll',
        loadChildren: () => import('./../create-poll/create-poll.module').then((m) => m.CreatePollModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTabRoutingModule { }
