import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output,
  ElementRef,
  OnDestroy
} from '@angular/core';
import {getMessageFromApiError, IApiError} from 'src/app/shared/utils/api-error-handling';
import {IRepost, PostsService} from 'src/app/shared/services/posts';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ReportsService} from 'src/app/shared/services/reports';
import {BehaviorSubject, Observable, ReplaySubject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {IUser, UserService} from '../../services/user';

@Component({
  selector: 'newsreel-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TweetComponent implements AfterViewInit, OnDestroy {
  @Input() public tweet: IRepost;
  @Input() public showFooterBtnPanel = true;

  public headerText: string;

  private observer: IntersectionObserver;
  private destroy$ = new ReplaySubject(1);
  private loading$ = new BehaviorSubject(false);

  @Output() private change = new EventEmitter<IRepost>();
  @Output() private delete = new EventEmitter<number>();

  private isLogin: boolean;

  constructor(
    private elementRef: ElementRef,
    private PostsService: PostsService,
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService,
    private UserService: UserService
  ) {
    this.UserService.getUser().subscribe((data: IUser | null) => {
      this.isLogin = data ? true : false;
    });
  }

  public ngAfterViewInit(): void {
    const el = this.elementRef.nativeElement;

    this.initObserver();
    this.observer.observe(el);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.observer?.disconnect();
  }

  public upvote(): void {
    const post = this.tweet;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    if (this.isLogin) {
      this.PostsService.upvotePost(post.id).pipe(
        catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the Tweet.')),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      ).subscribe((tweet) => this.change.emit(tweet as IRepost));
    }
  }

  public report(): void {
    if (this.loading$.value || this.tweet.reported) {
      return;
    }

    this.loading$.next(true);
    const params = {post: this.tweet.id};
    this.ReportsService.report(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to report the tweet.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      const tweet = {...this.tweet, reported: true};
      this.change.emit(tweet);
      this.SnackbarService.success('Tweet has been successfully reported.');
    });
  }

  public handleDelete(): void {
    if (this.loading$.value) {
      return;
    }

    const ID = this.tweet.id;
    this.loading$.next(true);
    this.PostsService.deletePost(ID).pipe(
      catchError((err) => this.handleError(err, 'Failed to delete the tweet.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      this.delete.emit(ID);
      this.SnackbarService.success('Tweet has been successfully deleted.');
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

  private initObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries, observer) => this.handleIntersection(entries), options);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    const isIntersecting = entries.some((entry) => entry.isIntersecting);

    if (isIntersecting) {
      this.initializeTweetScript();

      const twttr = window['twttr'];
      const el = this.elementRef.nativeElement;
      twttr.ready(() => twttr.widgets.load(el));
    }
  }

  private initializeTweetScript(): void {
    // https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
    window['twttr'] = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window['twttr'] || {};
      if (d.getElementById(id)) {
        return t;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }(document, 'script', 'twitter-wjs'));
  }

  redirectTo(page): void {
    window.open(page, '_blank');
  }
}
