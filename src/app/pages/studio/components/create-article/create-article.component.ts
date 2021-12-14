import {ChangeDetectionStrategy, Component, OnInit, OnDestroy, SecurityContext, OnChanges, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {getMessageFromApiError} from 'src/app/shared/utils/api-error-handling';
import {PostsService, IArticleParams} from 'src/app/shared/services/posts';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {TabsHelperService} from './../../services/tabs-helper';
import {ConfigService} from 'src/app/shared/services/config';
import {UserService} from 'src/app/shared/services/user';
import {getFirstWords} from 'src/app/shared/utils/slug.helper';
import {IFileObj} from 'src/app/shared/components/file-uploader';
import {IVideo} from '../../services/tabs-helper/tabs-helper.interface';
import {CATEGORIES} from './../../studio.constants';
import {Router} from '@angular/router';
import {catchError, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, ReplaySubject, throwError} from 'rxjs';

@Component({
  selector: 'newsreel-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public isDesktop = this.ConfigService.isDesktop;
  public disable$ = new BehaviorSubject(true);
  public loading$ = new BehaviorSubject(false);
  public showEditor$ = new BehaviorSubject(true);
  public showToggle$ = new BehaviorSubject(false);
  public description = new FormControl('');
  public articleGroup = this.fb.group({
    category: ['', Validators.required],
    title: ['', Validators.required],
    text: ['', Validators.required]
  });

  private destroy$ = new ReplaySubject(1);
  public showEditItem: boolean = false;

  public postTypeList: Array<any> = [
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
    },
    {
      'name': 'Repost',
      'href': 'studio/repost/article'
    },
  ];

  public mediaType = [
    {
      'value': 'image',
      'label': 'Image'
    },
    {
      'value': 'video',
      'label': 'Video'
    }
  ];
  public mediaTypeDefault = 'image';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private UserService: UserService,
    private PostsService: PostsService,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService,
    private TabsHelperService: TabsHelperService,
  ) {

  }

  // TODO: REFACTOR component
  public ngOnInit(): void {
    this.TabsHelperService.emitUploadTabChange('image');
    this.setControlListeners();
  }

  public changeMediaType(ev: any): void {
    this.mediaTypeDefault = ev;
    this.emitUploadTabChange(ev);
  }

  public changePostType(pageName): void {
    this.router.navigate(['/' + pageName.href]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.disable$.complete();
    this.loading$.complete();
    this.showEditor$.complete();
    this.showToggle$.complete();
  }

  public handleToggle(value: boolean): void {
    const eventValue: boolean = ((typeof value === 'string') && value === 'true') ? true : false;
    this.showEditor$.next(value);

    if (this.mediaTypeDefault === 'video') {
      this.showEditItem = eventValue;
      this.toggleControl('text', eventValue);
    } else {
      this.showEditItem = value;
      this.toggleControl('text', true);
    }

    if (!this.router.url.includes('article')) {
      this.toggleControl('text', eventValue);
    }
  }

  // TODO: refactor needed remove this method
  public emitUploadTabChange(tab: 'image' | 'video' = 'image'): void {
    this.TabsHelperService.emitUploadTabChange(tab);
  }

  public submit(): void {
    if (this.articleGroup.invalid) {
      return;
    }

    this.loading$.next(true);
    const params: IArticleParams = this.articleGroup.value;
    const title = this.domSanitizer.sanitize(SecurityContext.URL, params.title);
    const description = params.text ? this.description.value : title;
    const slug = getFirstWords(title.trim());
    params.slug = slug;
    params.description = description.trim();


    this.PostsService.createArticle(params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to create an Article.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const msg = 'Article has been successfully created.';
      this.router.navigate(['profile', ID]).then(() => this.SnackbarService.success(msg));
    });
  }

  private toggleControl(name: string, value: boolean): void {
    const group = this.articleGroup;
    value ? group.addControl(name, new FormControl('', Validators.required)) : group.removeControl(name);
  }

  private setControlListeners(): void {
    this.TabsHelperService.observeUploadTabChange().pipe(
      distinctUntilChanged(),
      map((value) => this.handleTabChange(value)),
      switchMap((isVideo) => isVideo ? this.listenVideo() : this.listenImages()),
      takeUntil(this.destroy$)
    ).subscribe(() => {
    });

    this.articleGroup.statusChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const isInvalid = this.articleGroup.invalid;
      this.disable$.next(isInvalid);
    });
  }

  private handleTabChange(value: 'image' | 'video'): boolean {
    const isVideo = value === 'video';
    this.showToggle$.next(isVideo);
    this.handleToggle(!isVideo);

    // remove / add controls
    this.toggleControl('video', isVideo);
    this.toggleControl('type', isVideo);
    this.toggleControl('image', !isVideo);

    return isVideo;
  }

  private listenImages(): Observable<any> {
    return this.TabsHelperService.getImageObservable().pipe(
      tap((image: IFileObj) => this.articleGroup.controls.image.setValue(image.file))
    );
  }

  private listenVideo(): Observable<any> {
    return this.TabsHelperService.getVideoObservable().pipe(
      tap((video: IVideo) => {
        const controls = this.articleGroup.controls;
        controls.type.setValue(video.type);
        controls.video.setValue(video.url);
      })
    );
  }

}
