import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostHeaderInfoComponent } from './post-header-info.component';

import { TimeAgoModule } from 'src/app/shared/pipes/time-ago';


@NgModule({
  declarations: [PostHeaderInfoComponent],
  imports: [
    CommonModule,
    TimeAgoModule
  ],
  exports: [PostHeaderInfoComponent]
})
export class PostHeaderInfoModule { }
