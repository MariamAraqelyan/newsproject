import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent,
    data: {
      meta: {
        title: 'Help | Newsreel',
        description: 'If you need support or have a suggestion for how to improve the Newsreel, your input is always welcome.Please submit your request per e-mail using info@Newsreel.io. Unless additional information is needed, you will not receive a personal response.',
        url: 'newsreel.io/help'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
