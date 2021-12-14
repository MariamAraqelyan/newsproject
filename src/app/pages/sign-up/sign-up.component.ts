import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService, ISignUpParams} from 'src/app/shared/services/auth';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ConfigService} from 'src/app/shared/services/config';
import {getMessageFromApiError, IApiError, setFormWithAPIError} from 'src/app/shared/utils/api-error-handling';
import {FormBuilder, Validators} from '@angular/forms';
import {IFileObj} from 'src/app/shared/components/file-uploader';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'newsreel-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit, OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public errorCheck$ = new Subject();
  public imageMsg$ = new BehaviorSubject('');
  public loading$ = new BehaviorSubject(false);
  public errorMsgMap$ = new BehaviorSubject({});

  public phoneNumberCode: any = {};

  public userData = this.fb.group({
    avatar: ['', [Validators.required]],
    username: ['', [Validators.required]],
    phone_number: ['', [Validators.required]],
    intl_phone_number: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  private destroy$ = new Subject();


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private AuthService: AuthService,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService
  ) {
  }

  public ngOnInit(): void {
    this.setImageControlListeners();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.errorCheck$.complete();
    this.errorMsgMap$.complete();
  }


  public handleImageLoad(files: IFileObj[]): void {
    const control = this.userData.get('avatar');
    control.reset();
    control.markAsDirty();
    control.setValue(!files.length ? null : files[0]);
  }

  public submit(): void {
    if (this.userData.get('intl_phone_number').value) {
      const phoneValue = '+' + (this.phoneNumberCode.dialCode ? this.phoneNumberCode.dialCode : '1') + this.userData.get('intl_phone_number').value;
      this.userData.get('phone_number').setValue(phoneValue);
    }

    this.updateControlsStatus();

    if (!this.userData.valid) {
      return;
    }

    const formValue = this.userData.value;
    const data: ISignUpParams = {
      avatar: formValue.avatar.file,
      username: formValue.username,
      phone_number: formValue.phone_number,
      email: formValue.email,
      password: formValue.password
    };

    this.loading$.next(true);
    this.AuthService.signup(data).pipe(
      catchError((err: IApiError) => {
        const msg = getMessageFromApiError(err, 'Failed to sign up!');
        this.SnackbarService.error(msg);
        this.updateFormErrors(err);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const msg = 'You have successfully signed up.';
      this.router.navigate(['/sms-verification']).then(() => this.SnackbarService.success(msg));
    });
  }

  private updateControlsStatus(): void {
    const {controls} = this.userData;
    Object.keys(controls).forEach((key) => controls[key].markAsDirty());
    this.errorCheck$.next();
  }

  private setImageControlListeners(): void {
    const control = this.userData.get('avatar');

    this.errorCheck$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.setImageError(control.value));

    control.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((val) => this.setImageError(val));
  }

  private setImageError(val: any): void {
    const msg = !val ? 'This field is required' : '';
    this.imageMsg$.next(msg);
  }

  private updateFormErrors(err: IApiError): void {
    const error = err?.error?.apiError;

    if (error) {
      const errorMap = {};
      Object.keys(error).forEach((key) => errorMap[key] = error[key][0]);
      setFormWithAPIError(errorMap, this.userData);
      this.errorMsgMap$.next(errorMap);
    }
  }

  public getNumber(ev): void {
    let input1 = this.userData.get('intl_phone_number').value;
    const fullCountryCode = '+' + this.phoneNumberCode.dialCode;
    if ((ev.indexOf('+') !== -1) && (ev.indexOf(fullCountryCode) !== -1)) {
      const inputRealValue = input1.replace(fullCountryCode, '');
      this.userData.get('intl_phone_number').setValue(inputRealValue);
    }
  }

  public onCountryChange(ev): void {
    this.phoneNumberCode = ev;
    const fullCountryCode = '+' + this.phoneNumberCode.dialCode;
    let input1 = this.userData.get('intl_phone_number').value;
    if ((this.userData.get('intl_phone_number').value.indexOf('+') !== -1)
      && (this.userData.get('intl_phone_number').value.indexOf(fullCountryCode) !== -1)) {
      const inputRealValue = input1.replace(fullCountryCode, '');
      this.userData.get('intl_phone_number').setValue(inputRealValue);
    }
  }

}
