import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, UserService } from 'src/app/shared/services/user';
import { MetaService } from 'src/app/shared/services/meta';
import { ConfigService } from 'src/app/shared/services/config';
import { FollowerService } from 'src/app/shared/services/follower';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ReviewsModalComponent } from './components/reviews-modal';
import { EditProfileModalComponent } from './components/edit-profile-modal';
import { REVIEW_MODAL_OPTIONS, EDIT_MODAL_OPTIONS } from './profile.constants';
import { getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'newsreel-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$: Observable<IUser>;
  public loading$ = new BehaviorSubject(false);
  public isOwnProfile$ = new BehaviorSubject(true);
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;

  private loadedUserId: number;
  private modalDestroy$ = new Subject();
  private userReplay$ = new ReplaySubject<IUser>(1);
  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private MetaService: MetaService,
    private ConfigService: ConfigService,
    private UserService: UserService,
    private FollowerService: FollowerService,
    private SnackbarService: SnackbarService,
  ) { }

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.modalDestroy$.next(null);
    this.modalDestroy$.complete();
    this.isOwnProfile$.complete();
    this.userReplay$.complete();
  }

  public subscribe(): void {
    if (this.isOwnProfile$.value || this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.FollowerService.subscribe(this.loadedUserId).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to subscribe to the journalist.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      switchMap(() => this.UserService.getUserById(this.loadedUserId) as Observable<IUser>),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((user) => this.userReplay$.next(user));
  }

  public unsubscribe(): void {
    if (this.isOwnProfile$.value || this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.FollowerService.unsubscribe(this.loadedUserId).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to unsubscribe from the journalist.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      switchMap(() => this.UserService.getUserById(this.loadedUserId) as Observable<IUser>),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((user) => this.userReplay$.next(user));
  }

  public handleReview(): void {
    if (this.isOwnProfile$.value) {
      return;
    }

    this.user$.pipe(
      takeUntil(this.modalDestroy$),
    ).subscribe((user) => {
      this.modalDestroy$.next(null);
      const state = { state: { user } };
      this.isMobile ? this.router.navigate(['/write-review', user.id], state) : this.openReviewModal(user);
    });
  }

  public openEditModal(): void {
    this.user$.pipe(
      takeUntil(this.modalDestroy$),
    ).subscribe((user) => {
      this.modalDestroy$.next(null);
      const options:  MatDialogConfig = {
        ...EDIT_MODAL_OPTIONS,
        disableClose: this.isMobile,
        data: { user }
      };

      this.dialog.open(EditProfileModalComponent, options);
    });
  }

  private openReviewModal(user: IUser): void {
    const options = { ...REVIEW_MODAL_OPTIONS, data: { user } };
    const dialogRef = this.dialog.open(ReviewsModalComponent, options);

    // reload user to update all stats info
    const sub = dialogRef.afterClosed().pipe(
      filter((value) => value),
      switchMap(() => this.UserService.getUserById(this.loadedUserId) as Observable<IUser>)
    ).subscribe((user) => {
      sub.unsubscribe();
      this.userReplay$.next(user);
    });
  }

  private initSubscriptions(): void {
    this.user$ = this.userReplay$.asObservable();

    this.activatedRoute.data.pipe(
      map((data: { user: IUser }) => data.user),
      tap((user) => {
        this.loadedUserId = user.id;
        const isOwnProfile = this.UserService.getCurrentUserId() === user.id;
        this.isOwnProfile$.next(isOwnProfile);
      }),
      switchMap((user) => this.isOwnProfile$.value ? this.UserService.getUser() : of(user)),
      takeUntil(this.destroy$)
    ).subscribe((user) => this.userReplay$.next(user));
  }
}
