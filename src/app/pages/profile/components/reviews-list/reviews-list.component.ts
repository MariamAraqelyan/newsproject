import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { IReview, ReviewsService } from 'src/app/shared/services/reviews';
import { LayoutScrollService } from 'src/app/shared/services/layout-scroll';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { IUser, UserService } from 'src/app/shared/services/user';
import { ReportsService } from 'src/app/shared/services/reports';
import { BehaviorSubject, fromEvent, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, debounceTime, filter, finalize, takeUntil } from 'rxjs/operators';
import { SORT_TOP } from './reviews-list.constants';
import { getSortItems } from './reviews-list.helpers';

@Component({
  selector: 'newsreel-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsListComponent implements AfterViewInit, OnChanges, OnDestroy {
  public currentUser$ = this.UserService.getUser();
  public total$ = new BehaviorSubject(null);
  public loading$ = new BehaviorSubject(false);
  public reviews$ = new BehaviorSubject<IReview[]>([]);
  public sortItems$ = new BehaviorSubject([]);

  @Input() public user: IUser;
  @Input() private useLayoutScroll = false;
  @ViewChild('main') private mainWrapper: ElementRef<HTMLElement>;

  private page = 1;
  private perPage = 10;
  private ordering: '-id' | '-rating' = SORT_TOP;
  private destroy$ = new ReplaySubject(1);
  private isAllLoaded$ = new BehaviorSubject(false);

  constructor(
    private UserService: UserService,
    private ReviewsService: ReviewsService,
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService,
    private LayoutScrollService: LayoutScrollService
  ) { }

  public ngAfterViewInit(): void {
    this.setScrollListener();
  }

  public ngOnChanges(): void {
    this.resetData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.reviews$.complete();
    this.total$.complete();
    this.sortItems$.complete();
    this.isAllLoaded$.complete();
  }

  public trackReviews(index: number, review: IReview): number {
    return review.id;
  }

  public resetData(ordering: '-id' | '-rating' = SORT_TOP): void {
    this.page = 1;
    this.ordering = ordering;
    this.reviews$.next([]);
    this.total$.next(null);
    this.isAllLoaded$.next(false);

    const sortItems = getSortItems(ordering);
    this.sortItems$.next(sortItems);

    this.getReviews();
  }

  public getReviews(): void {
    if (this.loading$.value || this.isAllLoaded$.value) {
      return;
    }

    const params = {
      page: this.page,
      page_size: this.perPage,
      ordering: this.ordering,
      user_id: `${this.user.id}`
    };

    this.loading$.next(true);
    this.ReviewsService.getUserReviews(params).pipe(
      catchError((err: IApiError) => this.handleError(err, 'Failed to fetch reviews.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      const total = response.count;
      this.total$.next(total);

      const isAll = total <= (this.page * this.perPage);
      this.isAllLoaded$.next(isAll);

      this.page += 1;

      // ensure that data are unique
      const reviews = this.reviews$.value;
      const uniqData = response.results.filter((review) => !reviews.find((item) => item.id === review.id));
      this.reviews$.next([...reviews, ...uniqData]);
    });
  }

  public submitVote(value: boolean, reviewId: number, isReply = false): void {
    if (this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    const req = isReply ? this.ReviewsService.voteReply(reviewId, value) : this.ReviewsService.voteReview(reviewId, value);
    req.pipe(
      catchError((err) => this.handleError(err, 'Failed to submit vote.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((review) => this.updateReview(review));
  }

  public handleResponse(value: string, reviewId: number): void {
    if (this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.ReviewsService.replyReview(reviewId, value).pipe(
      catchError((err) => this.handleError(err, 'Failed to send a response.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((review) => this.updateReview(review));
  }

  public report(review: IReview, reportReply = false): void {
    const isReported = reportReply ? review?.reply?.reported : review.reported;

    if (this.loading$.value || isReported) {
      return;
    }

    const params = reportReply ? { reply: review.reply.id } : { review: review.id };

    this.loading$.next(true);
    this.ReportsService.report(params).pipe(
      catchError((err) => {
        this.SnackbarService.error('Failed to report review.');

        return throwError(err);
      }),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      const obj = reportReply ? review.reply : review;
      obj.reported = true;
      const newReview = { ...review };

      this.updateReview(newReview);
      this.SnackbarService.success('Review was successfull reported.');
    });
  }

  private setScrollListener(): void {
    if (this.useLayoutScroll) {
      this.LayoutScrollService.observeScrollEnd().pipe(
        filter(() => !this.isAllLoaded$.value),
        takeUntil(this.destroy$)
      ).subscribe(() => this.getReviews());

      return;
    }

    const el = this.mainWrapper.nativeElement;
    fromEvent(el, 'scroll').pipe(
      debounceTime(100),
      filter(() => !this.isAllLoaded$.value),
      filter(() => el.scrollHeight - el.offsetHeight - el.scrollTop <= 0),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getReviews());
  }

  private updateReview(review: IReview): void {
    const currentList = this.reviews$.value;
    const index = currentList.findIndex((item) => item.id === review.id);

    if (index === -1) {
      return;
    }

    currentList[index] = review;
    this.reviews$.next([...currentList]);
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }
}
