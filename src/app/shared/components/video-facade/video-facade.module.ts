import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFacadeComponent } from './video-facade.component';



@NgModule({
  declarations: [VideoFacadeComponent],
  imports: [
    CommonModule
  ],
  exports: [VideoFacadeComponent]
})
export class VideoFacadeModule { }
