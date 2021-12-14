import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisingOpportunitiesComponent } from './advertising-opportunities.component';

const routes: Routes = [
  {
    path: '',
    component: AdvertisingOpportunitiesComponent,
    data: {
      meta: {
        title: 'Advertising Opportunities | Newsreel',
        description: 'Newsreel and the Newsreel are an indispensable resource for influential brand marketers, agency executives and publishers. If you wish to speak to us about advertising opportunities please contact us per e-mail using info@Newsreel.io.',
        url: 'newsreel.io/advertising-opportunities'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisingOpportunitiesRoutingModule { }
