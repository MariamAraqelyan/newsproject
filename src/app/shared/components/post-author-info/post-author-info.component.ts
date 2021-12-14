import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {SocialShareModalComponent} from 'src/app/shared/components/social-share-modal';
import {UserService} from 'src/app/shared/services/user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {IPost} from 'src/app/shared/services/posts';
import {ReplaySubject} from "rxjs";
import {Router} from "@angular/router";
import {ConfigService} from '../../services/config';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SocialShareComponent} from "../social-share/social-share.component";

@Component({
  selector: 'newsreel-post-author-info',
  templateUrl: './post-author-info.component.html',
  styleUrls: ['./post-author-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostAuthorInfoComponent implements OnInit {
  public user$ = this.UserService.getUser();
  public activeUpVote: boolean = false;

  public isDesktop = this.ConfigService.isDesktop;
  public isMobile = this.ConfigService.isMobile;

  public shareLink$ = new ReplaySubject(1);
  public sharePostData$ = new ReplaySubject(1);

  @Input() public post: IPost;
  @Input() public showBtnPanel = true;

  @Output() private vote = new EventEmitter();
  @Output() private report = new EventEmitter();
  @Output() private delete = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private UserService: UserService,
    private router: Router,
    private ConfigService: ConfigService,
    private _bottomSheet: MatBottomSheet) {

  }

  public ngOnInit(): void {
    const url = this.router.createUrlTree(['/post', this.post.id]);
    const link = window.location.host + url;
    this.shareLink$.next(link);
    this.sharePostData$.next(this.post);
  }

  public handleVote(): void {
    this.vote.emit();
  }

  public handleReport(): void {
    this.report.emit();
  }

  public handleDelete(): void {
    this.delete.emit();
  }

  public repost(): void {
    this._bottomSheet.open(SocialShareComponent);
  }

}
