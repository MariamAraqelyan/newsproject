import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article.component';
import { CreateArticleRoutingModule } from './create-article-routing.module';


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
import {NgSwitcheryModule} from 'angular-switchery-ios';


@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    CreateArticleRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SpinnerModule,
    QuillEditorModule,
    MatSlideToggleModule,
    MatTabsModule,
    AddVideoModule,
    AddImageModule,
    RouterModule,
    NgSwitcheryModule
  ]
})
export class CreateArticleModule { }
