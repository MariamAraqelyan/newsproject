import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, OnChanges, OnDestroy, Output } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { FollowerService } from 'src/app/shared/services/follower';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { IUser, UserService } from 'src/app/shared/services/user';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, filter, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-subscribe-btn',
  templateUrl: './subscribe-btn.component.html',
  styleUrls: ['./subscribe-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscribeBtnComponent implements OnInit, OnChanges, OnDestroy {
  public loading$ = new BehaviorSubject(false);
  public isSubscribed$ = new BehaviorSubject(false);
  public isOwnProfile$ = new BehaviorSubject(false);
  @Output() public change = new EventEmitter<boolean>();

  private destroy$ = new ReplaySubject(1);

  @Input() private journalistId: number;
  @Input() private journalist: IUser;

  constructor(
    private UserService: UserService,
    private FollowerService: FollowerService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnInit(): void {
    this.listenUserChange();
  }

  public ngOnChanges(): void {
    this.updateData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.isSubscribed$.complete();
  }

  public subscribe(): void {
    if (this.isOwnProfile$.value || this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.FollowerService.subscribe(this.journalistId).pipe(
      catchError((err) => this.handleError(err, 'Failed to subscribe to the journalist.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.change.emit(true);
      this.isSubscribed$.next(true);
    });
  }

  public unsubscribe(): void {
    if (this.isOwnProfile$.value || this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.FollowerService.unsubscribe(this.journalistId).pipe(
      catchError((err) => this.handleError(err, 'Failed to unsubscribe from the journalist.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.change.emit(false);
      this.isSubscribed$.next(false);
    });
  }

  private checkIfSubscribed(): void {
    if (this.isOwnProfile$.value || this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.UserService.getUserById(this.journalistId).pipe(
      catchError((err) => this.handleError(err, 'Failed to get the user.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((user) => this.isSubscribed$.next(user.is_subscribed));
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

  private listenUserChange(): void {
    let loadedUserId = this.UserService.getCurrentUserId();

    this.UserService.getUser().pipe(
      filter((user) => loadedUserId !== user?.id),
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      loadedUserId = user?.id;
      this.updateData();
    });
  }

  private updateData(): void {
    const isOwnProfile = this.UserService.getCurrentUserId() === this.journalistId;
    this.isOwnProfile$.next(isOwnProfile);

    if (isOwnProfile) {
      return;
    }

    const user = this.journalist;
    user ? this.isSubscribed$.next(user.is_subscribed) : this.checkIfSubscribed();
  }

}
