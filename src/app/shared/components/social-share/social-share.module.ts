import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialShareComponent } from './social-share.component';

import { MatButtonModule } from '@angular/material/button';
import {ClipboardModule} from 'ngx-clipboard';


@NgModule({
  declarations: [SocialShareComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ClipboardModule
  ],
  exports: [SocialShareComponent]
})
export class SocialShareModule { }
