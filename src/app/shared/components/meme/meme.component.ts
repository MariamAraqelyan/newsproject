import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnDestroy} from '@angular/core';
import {getMessageFromApiError, IApiError} from 'src/app/shared/utils/api-error-handling';
import {IMemePost, PostsService} from 'src/app/shared/services/posts';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ReportsService} from 'src/app/shared/services/reports';
import {BehaviorSubject, Observable, ReplaySubject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {IUser, UserService} from "../../services/user";

@Component({
  selector: 'newsreel-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemeComponent implements OnDestroy {
  @Input() public meme: IMemePost;
  @Input() public readMode = true;
  @Input() public showFooterBtnPanel = true;

  private destroy$ = new ReplaySubject(1);
  private loading$ = new BehaviorSubject(false);

  @Output() private change = new EventEmitter<IMemePost>();
  @Output() private delete = new EventEmitter<number>();
  private isLogin: boolean;

  constructor(
    private UserService: UserService,
    private PostsService: PostsService,
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService
  ) {
    this.UserService.getUser().subscribe((data: IUser | null) => {
      this.isLogin = data ? true : false;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
  }

  public upvote(): void {
    const post = this.meme;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    if (this.isLogin) {
      this.PostsService.upvotePost(post.id).pipe(
        catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the meme.')),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      ).subscribe((meme) => this.change.emit(meme as IMemePost));
    }
  }

  public report(): void {
    if (this.loading$.value || this.meme.reported) {
      return;
    }

    this.loading$.next(true);
    const params = {post: this.meme.id};
    this.ReportsService.report(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to report the meme.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      const meme = {...this.meme, reported: true};
      this.change.emit(meme);
      this.SnackbarService.success('Meme has been successfully reported.');
    });
  }

  public handleDelete(): void {
    if (this.loading$.value) {
      return;
    }

    const ID = this.meme.id;
    this.loading$.next(true);
    this.PostsService.deletePost(ID).pipe(
      catchError((err) => this.handleError(err, 'Failed to delete the meme.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      this.delete.emit(ID);
      this.SnackbarService.success('Meme has been successfully deleted.');
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }
}
