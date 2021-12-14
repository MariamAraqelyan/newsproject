import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudioComponent } from './studio.component';

const routes: Routes = [
  {
    path: '',
    component: StudioComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create'
      },
      {
        path: 'create',
        loadChildren: () => import('./components/create-tab/create-tab.module').then((m) => m.CreateTabModule)
      },
      {
        path: 'psa',
        children: [
          {
            path: '',
            loadChildren: () => import('./components/create-psa/create-psa.module').then((m) => m.CreatePsaModule)
          },
          {
            path: ':slug/edit',
            loadChildren: () => import('./components/edit-psa/edit-psa.module').then((m) => m.EditPsaModule)
          }
        ]
      },
      {
        path: 'repost',
        loadChildren: () => import('./components/repost-tab/repost-tab.module').then((m) => m.RepostTabModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudioRoutingModule { }
