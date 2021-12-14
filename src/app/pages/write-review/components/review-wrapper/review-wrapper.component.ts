import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';
import { IRateItem } from '../review-rate/review-rate.interface';
import { ReviewsService } from 'src/app/shared/services/reviews';
import { IApiError, getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { IUser } from 'src/app/shared/services/user';
import { Router } from '@angular/router';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'newsreel-review-wrapper',
  templateUrl: './review-wrapper.component.html',
  styleUrls: ['./review-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewWrapperComponent implements OnInit, OnDestroy {
  @Input() public user: IUser;
  @Output() public cancel = new EventEmitter();

  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public isFirstStep$ = new BehaviorSubject(true);
  public loading$ = new BehaviorSubject(false);

  private destroy$ = new ReplaySubject(1);
  private review = this.fb.group({
    text: ['', [ Validators.required, Validators.minLength(1) ]],
    user: ['', [ Validators.required ]],
    ethics: ['', [ Validators.required ]],
    trust: ['', [ Validators.required ]],
    accuracy: ['', [ Validators.required ]],
    fairness: ['', [ Validators.required ]],
    contribution: ['', [ Validators.required ]],
    expertise: ['', [ Validators.required ]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService,
    private ReviewsService: ReviewsService
  ) { }

  public ngOnInit(): void {
    this.review.controls.user.setValue(this.user.id);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.isFirstStep$.complete();
  }

  public handleBackEvent(): void {
    this.isFirstStep$.value ? this.cancel.emit() : this.handleCancel();
  }

  public handleDescriptionSubmit(value: string): void {
    this.review.controls.text.setValue(value);
    this.submit();
  }

  public handleCancel(): void {
    this.review.reset();
    this.review.controls.user.setValue(this.user.id);
    this.isFirstStep$.next(true);
  }

  public handleRateSelect(rateList: IRateItem[]): void {
    this.isFirstStep$.next(false);
    rateList.forEach(({ key, value }) => {
      const control = this.review.get(key);
      control.setValue(value);
    });
  }

  public submit(): void {
    if (this.loading$.value || this.review.invalid) {
      return;
    }

    this.loading$.next(true);
    this.ReviewsService.createReview(this.review.value).pipe(
      catchError((err: IApiError) => {
        const msg = getMessageFromApiError(err, 'Failed to create a review.', 'user')
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() =>{
      this.cancel.emit(true);
      const msg = 'Review was successfully created.';
      this.router.navigate(['profile', this.user.id]).then(() => this.SnackbarService.success(msg));
    });
  }

}
