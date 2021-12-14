import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedStoryListComponent } from './related-story-list.component';

import { RelatedStoryModule } from './../related-story';
import { AnimatedSpinnerModule } from 'src/app/shared/components/animated-spinner';

@NgModule({
  declarations: [RelatedStoryListComponent],
  imports: [
    CommonModule,
    RelatedStoryModule,
    AnimatedSpinnerModule
  ],
  exports: [RelatedStoryListComponent]
})
export class RelatedStoryListModule { }
