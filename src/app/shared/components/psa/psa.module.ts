import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsaComponent } from './psa.component';

import { RouterModule } from '@angular/router';
import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';


@NgModule({
  declarations: [PsaComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostAuthorInfoModule,
    PostHeaderInfoModule
  ],
  exports: [PsaComponent]
})
export class PsaModule { }
