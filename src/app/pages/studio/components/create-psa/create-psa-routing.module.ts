import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePsaComponent } from './create-psa.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePsaComponent,
    data: {
      meta: {
        title: 'PSA Studio | Newsreel'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePSARoutingModule { }
