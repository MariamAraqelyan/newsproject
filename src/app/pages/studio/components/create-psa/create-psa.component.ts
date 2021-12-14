import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { getFirstWords } from 'src/app/shared/utils/slug.helper';
import { PostsService, IPSAParams } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { UserService } from 'src/app/shared/services/user';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { CATEGORIES } from './../../studio.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'newsreel-create-psa',
  templateUrl: './create-psa.component.html',
  styleUrls: ['./create-psa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePsaComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public disable$ = new BehaviorSubject(true);
  public loading$ = new BehaviorSubject(false);
  public psaGroup = this.fb.group({
    category: ['', Validators.required],
    text: ['', Validators.required],
    description: ['', Validators.required]
  });

  private destroy$ = new ReplaySubject(1);

  public postTypeList: Array<any> = [
    {
      'name' : 'Psa',
      'href' : 'studio/psa'
    },
    {
      'name' : 'Article',
      'href' : 'studio/create/article'
    },
    {
      'name' : 'Meme',
      'href' : 'studio/create/meme'
    },
    {
      'name' : 'Poll',
      'href' : 'studio/create/poll'
    },
    {
      'name' : 'Repost',
      'href' : 'studio/repost/article'
    },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private UserService: UserService,
    private PostsService: PostsService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnInit(): void {
    this.psaGroup.statusChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const isInvalid = this.psaGroup.invalid;
      this.disable$.next(isInvalid);
    });
  }

  public changePostType(pageName): void {
    this.router.navigate(['/' + pageName.href]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.disable$.complete();
  }

  public submit(): void {
    if (this.loading$.value || this.psaGroup.invalid) {
      return;
    }

    const value = this.psaGroup.value;
    const description = value.description.trim();
    const slug = getFirstWords(description);
    const params: IPSAParams = {
      category: value.category,
      text: value.text,
      description,
      slug
    };

    this.loading$.next(true);
    this.PostsService.createPSA(params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to create a PSA.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const msg = 'PSA has been successfully created.';
      this.router.navigate(['profile', ID]).then(() => this.SnackbarService.success(msg));
    });
  }

}
