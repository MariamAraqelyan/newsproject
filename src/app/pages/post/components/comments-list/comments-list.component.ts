import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SecurityContext, SimpleChanges } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { CommentsService, IComment } from 'src/app/shared/services/comments';
import { LayoutScrollService } from 'src/app/shared/services/layout-scroll';
import { IGeneralPost, PostsService } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { PostHelperService } from './../../services/post-helper';
import { ConfigService } from 'src/app/shared/services/config';
import { UserService } from 'src/app/shared/services/user';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, filter, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent implements OnChanges, AfterViewInit, OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public currentUser$ = this.UserService.getUser();
  public loading$ = new BehaviorSubject(false);
  public comments$ = new BehaviorSubject<IComment[]>([]);
  public smsLink$ = new ReplaySubject<string>(1);
  public commentControl = new FormControl('', [ Validators.required ]);
  public showUserLink$ = new BehaviorSubject(true);

  @Input() public postId: number;
  @Input() public post: IGeneralPost;

  @Output() private repost = new EventEmitter();
  @Output() private upvote = new EventEmitter<IGeneralPost>();

  private page = 1;
  private perPage = 5;
  private destroy$ = new ReplaySubject(1);
  private isAllLoaded$ = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private domSanitizer: DomSanitizer,
    private UserService: UserService,
    private PostsService: PostsService,
    private ConfigService: ConfigService,
    private CommentsService: CommentsService,
    private SnackbarService: SnackbarService,
    private PostHelperService: PostHelperService,
    private LayoutScrollService: LayoutScrollService
  ) { }

  public ngAfterViewInit(): void {
    this.setScrollListener();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.postId) {
      this.resetData();
      this.setSmsLink();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.smsLink$.complete();
    this.comments$.complete();
    this.isAllLoaded$.complete();
    this.showUserLink$.complete();
  }

  public trackComments(index: number, comment: IComment): number {
    return comment.id;
  }

  public resetData(): void {
    this.page = 1;
    this.comments$.next([]);
    this.isAllLoaded$.next(false);

    this.getComments();
  }

  // TODO: fix spinner loading
  public submitComment(): void {
    if (this.loading$.value || this.commentControl.invalid) {
      return;
    }

    this.loading$.next(true);
    const params = { post: this.postId, text: this.commentControl.value };
    this.CommentsService.addComment(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to add the comment.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((comment) => {
      const comments = this.comments$.value;
      this.comments$.next([...comments, comment]);
      this.PostHelperService.emitCommentsIncrease();
      this.commentControl.reset();
    });
  }

  // TODO: fix spinner loading
  public handleVote(): void {
    const post = this.post;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    this.PostsService.upvotePost(post.id).pipe(
      catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the post.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((post) => this.upvote.emit(post));
  }

  public handleRepost(): void {
    this.repost.emit();
  }

  private getComments(): void {
    if (this.loading$.value || this.isAllLoaded$.value) {
      return;
    }

    this.loading$.next(true);
    const params = { page: this.page, page_size: this.perPage };
    this.CommentsService.getComments(this.postId, params).pipe(
      catchError((err) => this.handleError(err, 'Failed to get comments.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      const isAll = response.count <= (this.page * this.perPage);
      this.isAllLoaded$.next(isAll);
      this.page += 1;

      // ensure that data are unique
      const comments = this.comments$.value;
      const uniqData = response.results.filter((comment) => !comments.find((item) => item.id === comment.id));
      const sortedData = [...comments, ...uniqData].sort((a, b) => Number(a.created_at) - Number(b.created_at));
      this.comments$.next(sortedData);
    });
  }

  private setSmsLink(): void {
    const link = this.ConfigService.config.domain + this.router.url;
    const dirtyLink = `sms:?&body=${link}`;
    const clean = this.domSanitizer.sanitize(SecurityContext.URL, dirtyLink);
    this.smsLink$.next(clean);
  }

  private setScrollListener(): void {
    this.LayoutScrollService.observeScrollEnd().pipe(
      filter(() => !this.isAllLoaded$.value),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getComments());

    if (this.isDesktop) {
      return;
    }

    let previousChange = 0;
    this.LayoutScrollService.observeScrollChange().pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((change) => {
      if (previousChange === 0) {
        previousChange = change;

        return;
      }

      const isBottom = change < 130;
      const showLink = isBottom || change > previousChange;
      previousChange = change;
      this.showUserLink$.next(showLink);
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

}
