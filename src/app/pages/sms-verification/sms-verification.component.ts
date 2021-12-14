import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneVerificationService } from 'src/app/shared/services/phone-verification';
import { IApiError, getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsVerificationComponent implements OnInit, OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public phoneConfirm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]]
  });

  private destroy$ = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ConfigService: ConfigService,
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
      const msg = 'Your phone has been verified!';
      this.router.navigate(['/']).then(() => this.SnackbarService.success(msg));
    });
  }
}
