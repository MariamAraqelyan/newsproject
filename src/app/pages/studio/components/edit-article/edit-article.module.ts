import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditArticleRoutingModule } from './edit-article-routing.module';
import { EditArticleComponent } from './edit-article.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from 'src/app/shared/components/spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillEditorModule } from 'src/app/shared/components/quill-editor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { AddVideoModule } from './../add-video';
import { AddImageModule } from './../add-image';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    EditArticleRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    SpinnerModule,
    ReactiveFormsModule,
    QuillEditorModule,
    MatSlideToggleModule,
    MatTabsModule,
    AddVideoModule,
    AddImageModule,
    RouterModule
  ]
})
export class EditArticleModule { }
