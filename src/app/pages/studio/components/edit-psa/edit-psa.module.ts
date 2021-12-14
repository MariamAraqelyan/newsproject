import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPsaRoutingModule } from './edit-psa-routing.module';
import { EditPsaComponent } from './edit-psa.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillEditorModule } from 'src/app/shared/components/quill-editor';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [EditPsaComponent],
  imports: [
    CommonModule,
    EditPsaRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    SpinnerModule,
    ReactiveFormsModule,
    QuillEditorModule,
    RouterModule
  ]
})
export class EditPsaModule { }
