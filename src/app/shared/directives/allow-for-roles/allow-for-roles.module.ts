import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllowForRolesDirective } from './allow-for-roles.directive';


@NgModule({
  declarations: [AllowForRolesDirective],
  imports: [
    CommonModule
  ],
  exports: [AllowForRolesDirective]
})
export class AllowForRolesModule { }
