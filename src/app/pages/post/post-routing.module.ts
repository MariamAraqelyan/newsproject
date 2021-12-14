import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from './post.component';
import {PostResolverService} from './resolvers/post';

const routes: Routes = [{
  path: ':slug',
  component: PostComponent,
  resolve: {
    post: PostResolverService
  },
  data: {
    meta: {
      title: '',
      description: '',
      url: ''
    }
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
