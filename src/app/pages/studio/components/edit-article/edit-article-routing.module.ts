import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditArticleComponent } from './edit-article.component';
import { PostResolverService } from './resolvers/post-resolver';

const routes: Routes = [{
  path: '',
  component: EditArticleComponent,
  resolve: {
    post: PostResolverService
  },
  data: {
    meta: {
      title: 'Edit Article Studio | Newsreel'
    }
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditArticleRoutingModule { }
