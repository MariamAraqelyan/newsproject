import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPost } from 'src/app/shared/services/posts';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'newsreel-social-share-modal',
  templateUrl: './social-share-modal.component.html',
  styleUrls: ['./social-share-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialShareModalComponent implements OnInit, OnDestroy {
  public shareLink$ = new ReplaySubject(1);
  public sharePostData$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private ConfigService: ConfigService,
    @Inject(MAT_DIALOG_DATA) private data: { post: IPost; },
    private _bottomSheetRef: MatBottomSheetRef<SocialShareModalComponent>
  ) {

  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public ngOnInit(): void {
    const url = this.router.createUrlTree(['/post', this.data.post.id]);
    const link = this.ConfigService.config.domain + url;
    this.shareLink$.next(link);
    this.sharePostData$.next(this.data.post);
  }

  public ngOnDestroy(): void {
    this.shareLink$.complete();
    this.sharePostData$.complete();
  }

}
