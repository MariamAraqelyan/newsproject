import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocialShareModalComponent} from './social-share-modal.component';

import {SocialShareModule} from 'src/app/shared/components/social-share';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [SocialShareModalComponent],
  imports: [
    CommonModule,
    SocialShareModule,
    MatDialogModule
  ],
  exports: [SocialShareModalComponent]
})
export class SocialShareModalModule {
}
