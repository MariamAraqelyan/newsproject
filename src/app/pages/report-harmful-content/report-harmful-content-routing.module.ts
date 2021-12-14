import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportHarmfulContentComponent } from './report-harmful-content.component';

const routes: Routes = [
  {
    path: '',
    component: ReportHarmfulContentComponent,
    data: {
      meta: {
        title: 'Report Harmful Or Plagiarized Content | Newsreel',
        description: 'Newsreel deals with copyright infringement on the Newsreel in accordance with the Digital Millennium Copyright Act.If you believe that Content residing or accessible on the Newsreel infringes a copyright, please send a notice of copyright infringement containing the following information to info@Newsreel.io',
        url: 'newsreel.io/report-harmful-content'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportHarmfulContentRoutingModule { }
