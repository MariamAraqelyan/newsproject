import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { getMessageFromApiError, IApiError, setFormWithAPIError } from 'src/app/shared/utils/api-error-handling';
import { UserService, IUser, IUpdateUserParams } from 'src/app/shared/services/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFileObj } from 'src/app/shared/components/file-uploader';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileModalComponent implements OnDestroy {
  public user: IUser = this.data.user;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public errorMsgMap$ = new BehaviorSubject({});
  public imageMsg$ = new BehaviorSubject('');
  public errorCheck$ = new Subject();

  public userData = this.fb.group({
    avatar: [ null ],
    username: [ this.user.username, Validators.required ],
    facebook: [ this.user.facebook ],
    twitter: [ this.user.twitter ],
    linkedin: [ this.user.linkedin ],
    bio: [ this.user.bio ]
  });

  private destroy$ = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService,
    private dialogRef: MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: IUser; }
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.errorCheck$.complete();
    this.errorMsgMap$.complete();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public handleImageLoad(files: IFileObj[]): void {
    const control = this.userData.get('avatar');
    control.reset();
    control.markAsDirty();
    control.setValue(!files.length ? null : files[0]);
  }

  public submit(): void {
    this.updateControlsStatus();

    if (this.loading$.value || this.userData.invalid) {
      return;
    }

    this.loading$.next(true);
    const data = this.formRequestData();
    this.UserService.updateUserData(data).pipe(
      catchError((err: IApiError) => {
        const msg = getMessageFromApiError(err, 'Failed to update profile!');
        this.SnackbarService.error(msg);
        this.updateFormErrors(err);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.SnackbarService.success('Profile was successfully updated.')
      this.close();
    });
  }

  private formRequestData(): IUpdateUserParams {
    const formValue = this.userData.value;
    const data: IUpdateUserParams = {
      avatar: formValue.avatar?.file,
      username: formValue.username,
      facebook: formValue.facebook,
      twitter: formValue.twitter,
      linkedin: formValue.linkedin,
      bio: formValue.bio
    };

    Object.keys(data).forEach((key) => {
      const value = data[key];
      const isEmpty = value === null || value === undefined;
      const isSame = value === this.user[key];

      if (isEmpty || isSame) {
        delete data[key];
      }
    });

    return data;
  }

  private updateControlsStatus(): void {
    const { controls } = this.userData;
    Object.keys(controls).forEach((key) => controls[key].markAsDirty());
    this.errorCheck$.next();
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
}
