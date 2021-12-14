import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PhoneVerificationService } from 'src/app/shared/services/phone-verification';
import { IApiError, getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-phone-confirm',
  templateUrl: './phone-confirm.component.html',
  styleUrls: ['./phone-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneConfirmComponent implements OnInit, OnDestroy {

  public loading$ = new BehaviorSubject(false);
  public phoneConfirm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]]
  });

  @Output() public back = new EventEmitter();
  @Output() public success = new EventEmitter();

  private destroy$ = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private PhoneVerificationService: PhoneVerificationService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnInit(): void {
    this.sendCode();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
  }

  public emitBackEvent(): void {
    this.back.emit();
  }

  public sendCode(): void {
    if (this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.PhoneVerificationService.sendVerificationCode().pipe(
      catchError((err: IApiError) => {
        const msg = getMessageFromApiError(err, 'Failed to send verification code to your phone.', 'code');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.SnackbarService.success('Verification code has been sent to your phone.'));
  }

  public verifyCode(): void {
    if (this.loading$.value || this.phoneConfirm.invalid) {
      return;
    }

    const code = this.phoneConfirm.value.code;
    this.loading$.next(true);
    this.PhoneVerificationService.verifyPhone(code).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to verify your phone!', 'code');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.SnackbarService.success('Your phone has been verified!');
      this.success.emit();
    });
  }
}
