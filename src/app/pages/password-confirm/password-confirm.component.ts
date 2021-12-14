import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiError, setFormWithAPIError, getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { ResetPasswordService } from 'src/app/shared/services/reset-password';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PasswordConfirmComponent implements OnInit, OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public errorMsgMap$ = new BehaviorSubject({});
  public errorCheck$ = new Subject();
  public resetPassword = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  private token = '';
  private destroy$ = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ConfigService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private SnackbarService: SnackbarService,
    private ResetPasswordService: ResetPasswordService
  ) { }

  public ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.errorCheck$.complete();
  }

  public submit(): void {
    this.updateControlsStatus();

    if (this.loading$.value || this.resetPassword.invalid) {
      return;
    }

    const params = {
      token: this.token,
      password: this.resetPassword.value.password
    };

    this.loading$.next(true);
    this.ResetPasswordService.reset(params).pipe(
      catchError((err: IApiError) => {
        this.updateFormErrors(err);
        const msg = getMessageFromApiError(err, 'Failed to reset password!', 'token');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const msg = 'Your password has been reseted.';
      this.router.navigate(['/sign-in']).then(() => this.SnackbarService.success(msg));
    });
  }

  private updateControlsStatus(): void {
    const { controls } = this.resetPassword;
    Object.keys(controls).forEach((key) => controls[key].markAsDirty());
    this.errorCheck$.next();
  }

  private updateFormErrors(err: IApiError): void {
    const error = err?.error?.apiError;

    if (error) {
      const errorMap = {};
      Object.keys(error).forEach((key) => errorMap[key] = error[key][0]);
      setFormWithAPIError(errorMap, this.resetPassword);
      this.errorMsgMap$.next(errorMap);
    }
  }
}
