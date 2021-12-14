import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'news'
      },
      {
        path: 'news',
        loadChildren: () => import('src/app/pages/neews-feed/neews-feed.module').then((m) => m.NeewsFeedModule),
        data: {
          isMainDisplay: true
        }
      },
      {
        path: 'post',
        pathMatch: 'full',
        redirectTo: 'news'
      },
      {
        path: 'profile',
        pathMatch: 'full',
        redirectTo: 'news'
      },
      {
        path: 'profile',
        loadChildren: () => import('src/app/pages/profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'post',
        loadChildren: () => import('src/app/pages/post/post.module').then((m) => m.PostModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
