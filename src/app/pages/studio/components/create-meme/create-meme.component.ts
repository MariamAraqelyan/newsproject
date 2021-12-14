import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { ConfigService } from 'src/app/shared/services/config';
import { PostsService } from 'src/app/shared/services/posts';
import { UserService } from 'src/app/shared/services/user';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { TabsHelperService } from './../../services/tabs-helper';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, takeUntil } from 'rxjs/operators';
import { CATEGORIES } from './../../studio.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'newsreel-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMemeComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public isDesktop = this.ConfigService.isDesktop;
  public disable$ = new BehaviorSubject(true);
  public loading$ = new BehaviorSubject(false);
  public showTitle$ = new BehaviorSubject(false);
  public memeGroup = this.fb.group({
    category: ['', Validators.required],
    image: ['', Validators.required]
  });

  private destroy$ = new ReplaySubject(1);

  public postTypeList: Array<any> = [
    {
      'name' : 'Meme',
      'href' : 'studio/create/meme'
    },
    {
      'name' : 'Article',
      'href' : 'studio/create/article'
    },
    {
      'name' : 'Poll',
      'href' : 'studio/create/poll'
    },
    {
      'name' : 'Psa',
      'href' : 'studio/psa'
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
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService,
    private TabsHelperService: TabsHelperService
  ) { }

  public ngOnInit(): void {
    // TODO: refactor
    this.setListeners();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.disable$.complete();
    this.loading$.complete();
    this.showTitle$.complete();
  }

  public handleToggle(value: boolean): void {
    const eventValue: boolean = ((typeof value === 'string') && value === "true") ? true : false;
    this.showTitle$.next(eventValue);
    const name = 'title';
    const group = this.memeGroup;
    eventValue ? group.addControl(name, new FormControl('', Validators.required)) : group.removeControl(name);
  }

  public changePostType(pageName): void {
    this.router.navigate(['/' + pageName.href]);
  }

  public submit(): void {
    if (this.loading$.value || this.memeGroup.invalid) {
      return;
    }

    const value = this.memeGroup.value;
    const params = {
      category: value.category,
      title: value.title,
      image: value.image
    };

    if (!params.title) {
      delete params.title;
    }

    this.loading$.next(true);
    this.PostsService.createMeme(params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to create a Meme.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const msg = 'Meme has been successfully created.';
      this.router.navigate(['profile', ID]).then(() => this.SnackbarService.success(msg));
    });
  }

  private setListeners(): void {
    this.TabsHelperService.getImageObservable().pipe(
      takeUntil(this.destroy$)
    ).subscribe((image) => {
      const control = this.memeGroup.controls.image;
      control.setValue(image ? image.file : null);
    });

    this.memeGroup.statusChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const value = this.memeGroup.invalid;
      this.disable$.next(value);
    });
  }

}
