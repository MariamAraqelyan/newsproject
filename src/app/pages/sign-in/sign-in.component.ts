import {Component, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {IApiError, setFormWithAPIError, getMessageFromApiError} from 'src/app/shared/utils/api-error-handling';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ConfigService} from 'src/app/shared/services/config';
import {AuthService} from 'src/app/shared/services/auth';
import {BehaviorSubject, ReplaySubject, Subject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'newsreel-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public errorMsgMap$ = new BehaviorSubject({});
  public errorCheck$ = new Subject();

  public phoneNumberCode: any = {};

  public credentials = this.fb.group({
    phone_number: ['', [Validators.required]],
    intl_phone_number: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService
  ) {

  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.errorCheck$.complete();
    this.errorMsgMap$.complete();
  }

  public submit(): void {
    if(this.credentials.get('intl_phone_number').value) {
      const phoneValue = '+' + this.phoneNumberCode.dialCode + this.credentials.get('intl_phone_number').value;
      this.credentials.get('phone_number').setValue(phoneValue);
    }

    this.updateControlsStatus();

    if (!this.credentials.valid || this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.AuthService.login(this.credentials.value).pipe(
      catchError((err: IApiError) => {
        const message = getMessageFromApiError(err, 'Failed to log in.');
        this.SnackbarService.error(message);
        this.updateFormErrors(err);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const msg = 'Successfully logged in.';
      this.router.navigate(['/']).then(() => this.SnackbarService.success(msg));
    });
  }

  private updateControlsStatus(): void {
    const {controls} = this.credentials;
    Object.keys(controls).forEach((key) => controls[key].markAsDirty());
    this.errorCheck$.next();
  }

  private updateFormErrors(err: IApiError): void {
    const error = err?.error?.apiError;

    if (error) {
      const errorMap = {};
      Object.keys(error).forEach((key) => errorMap[key] = error[key][0]);
      setFormWithAPIError(errorMap, this.credentials);
      this.errorMsgMap$.next(errorMap);
    }
  }

  public getNumber(ev): void {
    let input1  = this.credentials.get('intl_phone_number').value;
    const fullCountryCode = '+' + this.phoneNumberCode.dialCode;
    if((ev.indexOf('+') !== -1) && (ev.indexOf(fullCountryCode) !== -1)) {
      const inputRealValue = input1.replace(fullCountryCode,'');
      this.credentials.get('intl_phone_number').setValue(inputRealValue);
    }
  }

  public onCountryChange(ev): void {
    this.phoneNumberCode = ev;
    const fullCountryCode = '+' + this.phoneNumberCode.dialCode;
    let input1  = this.credentials.get('intl_phone_number').value;
    if((this.credentials.get('intl_phone_number').value.indexOf('+') !== -1)
      && (this.credentials.get('intl_phone_number').value.indexOf(fullCountryCode) !== -1)) {
      const inputRealValue = input1.replace(fullCountryCode,'');
      this.credentials.get('intl_phone_number').setValue(inputRealValue);
    }
  }

}
