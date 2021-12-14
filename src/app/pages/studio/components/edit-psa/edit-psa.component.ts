import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { PostsService, IPSAParams, IPsaPost } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { UserService } from 'src/app/shared/services/user';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';
import { CATEGORIES } from './../../studio.constants';

@Component({
  selector: 'newsreel-edit-psa',
  templateUrl: './edit-psa.component.html',
  styleUrls: ['./edit-psa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPsaComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public disable$ = new BehaviorSubject(true);
  public loading$ = new BehaviorSubject(false);
  public psaGroup = this.fb.group({
    category: ['', Validators.required],
    text: ['', Validators.required]
  });

  public quilEditorValueSetterSubject = new ReplaySubject(1);
  public quilEditorValueSetter$ = this.quilEditorValueSetterSubject.asObservable();

  private postId: number;
  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private PostsService: PostsService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.disable$.complete();
    this.quilEditorValueSetterSubject.complete();
  }

  public submit(): void {
    if (this.loading$.value || this.psaGroup.invalid) {
      return;
    }

    // TODO: add description here
    const value = this.psaGroup.value;
    // const description = value.description.trim();
    const params: IPSAParams = {
      category: value.category,
      text: value.text,
      description: '',
    };

    this.loading$.next(true);
    this.PostsService.updatePSA(this.postId, params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to update a PSA.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const msg = 'PSA has been successfully updated.';
      this.router.navigate(['profile', ID]).then(() => this.SnackbarService.success(msg));
    });
  }

  private setPostData(psa: IPsaPost): void {
    this.postId = psa.id;

    const controls = this.psaGroup.controls;
    controls.category.setValue(psa.category);

    controls.text.setValue(psa.text);
    this.quilEditorValueSetterSubject.next(psa.text);
  }

  private initSubscriptions(): void {
    this.activatedRoute.data.pipe(
      map((data: { post: IPsaPost }) => data.post),
      takeUntil(this.destroy$)
    ).subscribe((post) => this.setPostData(post));

    this.psaGroup.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const isInvalid = this.psaGroup.invalid;
      this.disable$.next(isInvalid);
    });
  }

}
