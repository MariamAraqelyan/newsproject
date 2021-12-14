import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {getMessageFromApiError} from 'src/app/shared/utils/api-error-handling';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {PostsService} from 'src/app/shared/services/posts';
import {ConfigService} from 'src/app/shared/services/config';
import {UserService} from 'src/app/shared/services/user';
import {FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject, ReplaySubject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {CATEGORIES} from './../../studio.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {getFirstChildRouteSnapshot} from 'src/app/shared/utils/router';

@Component({
  selector: 'newsreel-create-repost',
  templateUrl: './create-repost.component.html',
  styleUrls: ['./create-repost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRepostComponent implements OnInit, OnDestroy {
  public isTweet = false;
  public categories = CATEGORIES;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);

  private destroy$ = new ReplaySubject(1);

  public postTypeList: Array<any> = [
    {
      'name': 'Repost',
      'href': 'studio/repost/article'
    },
    {
      'name': 'Article',
      'href': 'studio/create/article'
    },
    {
      'name': 'Meme',
      'href': 'studio/create/meme'
    },
    {
      'name': 'Poll',
      'href': 'studio/create/poll'
    },
    {
      'name': 'Psa',
      'href': 'studio/psa'
    }
  ];

  public postTypeByPageList: Array<any> = [
    {
      'name': 'Article',
      'href': 'studio/repost/article',
    },
    {
      'name': 'Tweet',
      'href': 'studio/repost/tweet'
    }
  ];

  public repost = this.fb.group({
    category: ['', Validators.required],
    url: ['', Validators.required],
    repost_type: [this.postTypeByPageList[0], Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private ConfigService: ConfigService,
    private PostsService: PostsService,
    private SnackbarService: SnackbarService
  ) {
  }

  public ngOnInit(): void {
    const data = getFirstChildRouteSnapshot(this.activatedRoute).data;
    this.isTweet = !!data.isTweet;
  }

  public changePostType(pageName): void {
    this.router.navigate(['/' + pageName.href]);
  }

  public changePostTypePerPage(pageName): void {
    this.router.navigate(['/' + pageName.href]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
  }

  public submit(): void {
    if (this.loading$.value || this.repost.invalid) {
      return;
    }

    const value = this.repost.value;
    const params = {url: value.url, category: value.category, repost_type: value.repost_type.name.toLowerCase()};

    this.loading$.next(true);
    this.PostsService.createRepost(params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to make a repost.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const prefix = this.isTweet ? 'Tweet' : 'Article';
      const msg = `${prefix} has been successfully reposted.`;
      this.router.navigate(['profile', ID]).then(() => this.SnackbarService.success(msg));
    });
  }

}
