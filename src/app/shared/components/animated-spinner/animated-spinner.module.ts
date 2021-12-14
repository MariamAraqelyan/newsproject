import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedSpinnerComponent } from './animated-spinner.component';


@NgModule({
  declarations: [AnimatedSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [AnimatedSpinnerComponent]
})
export class AnimatedSpinnerModule { }
