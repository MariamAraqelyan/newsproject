import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemeComponent } from './meme.component';

import { RouterModule } from '@angular/router';
import { PostAuthorInfoModule } from 'src/app/shared/components/post-author-info';
import { PostHeaderInfoModule } from 'src/app/shared/components/post-header-info';


@NgModule({
  declarations: [MemeComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostAuthorInfoModule,
    PostHeaderInfoModule
  ],
  exports: [MemeComponent]
})
export class MemeModule { }
