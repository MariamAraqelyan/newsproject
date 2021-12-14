import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPsaComponent } from './edit-psa.component';
import { PostResolverService } from './resolvers/post-resolver';

const routes: Routes = [
  {
    path: '',
    component: EditPsaComponent,
    resolve: {
      post: PostResolverService
    },
    data: {
      meta: {
        title: 'Edit PSA Studio | Newsreel'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPsaRoutingModule { }
