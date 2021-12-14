import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { JournalistResolverService } from './resolvers/journalist';

const routes: Routes = [
  {
    path: ':id',
    component: ProfileComponent,
    resolve: {
      user: JournalistResolverService
    },
    data: {
      meta: {
        title: '',
        description: '',
        url : ''
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
