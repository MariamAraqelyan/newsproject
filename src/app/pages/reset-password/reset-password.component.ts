import { ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ResetPasswordService } from 'src/app/shared/services/reset-password';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { IApiError, setFormWithAPIError, getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public errorMsgMap$ = new BehaviorSubject({});
  public errorCheck$ = new Subject();
  public resetData = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]]
  });

  private destroy$ = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService,
    private ResetPasswordService: ResetPasswordService
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.errorCheck$.complete();
    this.errorMsgMap$.complete();
  }

  public submit(): void {
    this.updateControlsStatus();

    if (this.loading$.value || this.resetData.invalid) {
      return;
    }

    const email = this.resetData.value.email;
    this.loading$.next(true);
    this.ResetPasswordService.sendEmail(email).pipe(
      catchError((err: IApiError) => {
        this.updateFormErrors(err);
        const msg = getMessageFromApiError(err, 'Failed to send a message for password reset!')
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => this.SnackbarService.success('Reset link has been sent to your email!'));
  }

  private updateControlsStatus(): void {
    const { controls } = this.resetData;
    Object.keys(controls).forEach((key) => controls[key].markAsDirty());
    this.errorCheck$.next();
  }

  private updateFormErrors(err: IApiError): void {
    const error = err?.error?.apiError;

    if (error) {
      const errorMap = {};
      Object.keys(error).forEach((key) => errorMap[key] = error[key][0]);
      setFormWithAPIError(errorMap, this.resetData);
      this.errorMsgMap$.next(errorMap);
    }
  }
}
