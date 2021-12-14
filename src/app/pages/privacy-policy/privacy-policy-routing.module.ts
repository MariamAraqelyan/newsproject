import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent,
    data: {
      meta: {
        title: 'Privacy Policy | Newsreel',
        description: 'This Policy applies between you, the User of the Newsreel and Newsreel the owner and provider of the Newsreel. This Policy applies to our use of any and all Data collected by us in relation to your use of the Web Site and our Services.',
        url: 'newsreel.io/privacy-policy'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
