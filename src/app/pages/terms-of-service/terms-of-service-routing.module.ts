import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from './terms-of-service.component';

const routes: Routes = [
  {
    path: '',
    component: TermsOfServiceComponent,
    data: {
      meta: {
        title: 'Terms of Service | Newsreel',
        description: 'This agreement applies as between you, the User of the platform and Newsreel, the owner(s) of the Newsreel. Your agreement to comply with and be bound by these terms and conditions is deemed to occur upon your first use of the Newsreel.',
        url: 'newsreel.io/terms-of-service'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsOfServiceRoutingModule { }
