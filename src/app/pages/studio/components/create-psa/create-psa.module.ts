import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePsaComponent } from './create-psa.component';
import { CreatePSARoutingModule } from './create-psa-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillEditorModule } from 'src/app/shared/components/quill-editor';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CreatePsaComponent],
  imports: [
    CommonModule,
    CreatePSARoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SpinnerModule,
    QuillEditorModule,
    RouterModule
  ],
  exports: [CreatePsaComponent]
})
export class CreatePsaModule { }
