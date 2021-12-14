import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepostTabComponent } from './repost-tab.component';

const routes: Routes = [
  {
    path: '',
    component: RepostTabComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'article'
      },
      {
        path: 'article',
        loadChildren: () => import('./../create-repost/create-repost.module').then((m) => m.CreateRepostModule),
        data: {
          meta: {
            title: 'Article Repost Studio | Newsreel'
          }
        }
      },
      {
        path: 'tweet',
        loadChildren: () => import('./../create-repost/create-repost.module').then((m) => m.CreateRepostModule),
        data: {
          isTweet: true,
          meta: {
            title: 'Tweet Repost Studio | Newsreel'
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
export class RepostTabRoutingModule { }
