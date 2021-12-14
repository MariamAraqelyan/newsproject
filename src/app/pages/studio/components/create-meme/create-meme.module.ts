import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMemeComponent } from './create-meme.component';
import { CreateMemeRoutingModule } from './create-meme-routing.module';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddImageModule } from './../add-image';
import { RouterModule } from '@angular/router';
import {NgSwitcheryModule} from 'angular-switchery-ios';


@NgModule({
  declarations: [CreateMemeComponent],
  imports: [
    CommonModule,
    CreateMemeRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    SpinnerModule,
    AddImageModule,
    RouterModule,
    NgSwitcheryModule
  ]
})
export class CreateMemeModule { }
