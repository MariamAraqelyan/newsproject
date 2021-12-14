import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    data: {
      meta: {
        title: 'Login | Newsreel',
        description: 'Login/signup to your newsreel account to engage on the world\'s first crowdsourced news platform where news is created and rated by the people for the people.'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
