import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { IArticlePost, PostsService } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ReportsService } from 'src/app/shared/services/reports';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import {IUser, UserService} from "../../../../shared/services/user";

@Component({
  selector: 'newsreel-related-story',
  templateUrl: './related-story.component.html',
  styleUrls: ['./related-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RelatedStoryComponent implements OnInit {
  public isYoutube = false;
  public playBtnUrl: string;
  public headerText: string;
  public loading$ = new BehaviorSubject(false);

  @Input() public compactMode = false;
  @Input() public story: IArticlePost;
  @Output() public change = new EventEmitter<IArticlePost>();
  @Output() private delete = new EventEmitter<number>();

  private destroy$ = new ReplaySubject(1);
  private isLogin: boolean;

  constructor(
    private PostsService: PostsService,
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService,
    private UserService: UserService
  ) {
    this.UserService.getUser().subscribe((data: IUser | null) => {
      this.isLogin = data ? true : false;
    });
  }

  public ngOnInit(): void {
    this.isYoutube = this.story.video_type === 'youtube';
    this.playBtnUrl = `assets/svg/${this.isYoutube ? 'youtube' : 'vimeo'}-logo.svg`;
    this.headerText = `${this.story.comments || 0} comments`;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public upvote(): void {
    const post = this.story;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    if(this.isLogin) {
      this.PostsService.upvotePost(post.id).pipe(
        catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the story.')),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      ).subscribe((article) => this.change.emit(article as IArticlePost));
    }
  }

  public report(): void {
    if (this.loading$.value || this.story.reported) {
      return;
    }

    this.loading$.next(true);
    const params = { post: this.story.id };
    this.ReportsService.report(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to report the story.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      const story = { ...this.story, reported: true };
      this.change.emit(story);
      this.SnackbarService.success('Story has been successfully reported.');
    });
  }

  public handleDelete(): void {
    if (this.loading$.value) {
      return;
    }

    const ID = this.story.id;
    this.loading$.next(true);
    this.PostsService.deletePost(ID).pipe(
      catchError((err) => this.handleError(err, 'Failed to delete the post.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      this.delete.emit(ID);
      this.SnackbarService.success('Post has been successfully deleted.');
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }
}
