import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { PostsService, IArticleParams, IArticlePost } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { TabsHelperService } from './../../services/tabs-helper';
import { ConfigService } from 'src/app/shared/services/config';
import { UserService } from 'src/app/shared/services/user';
import { IFileObj } from 'src/app/shared/components/file-uploader';
import { IVideo } from '../../services/tabs-helper/tabs-helper.interface';
import { CATEGORIES } from './../../studio.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';

@Component({
  selector: 'newsreel-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditArticleComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public isDesktop = this.ConfigService.isDesktop;
  public disable$ = new BehaviorSubject(true);
  public loading$ = new BehaviorSubject(false);
  public showEditor$ = new BehaviorSubject(true);
  public showToggle$ = new BehaviorSubject(false);
  public quilEditorValueSetterSubject = new ReplaySubject(1);
  public quilEditorValueSetter$ = this.quilEditorValueSetterSubject.asObservable();
  public description = new FormControl('');
  public articleGroup = this.fb.group({
    category: ['', Validators.required],
    title: ['', Validators.required],
    text: ['', Validators.required]
  });

  public initialSelectedTab$: Observable<number>;

  private postId: number;
  private hasText: boolean;
  private post$ = new ReplaySubject<IArticlePost>(1);
  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private UserService: UserService,
    private PostsService: PostsService,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService,
    private TabsHelperService: TabsHelperService
  ) { }

  // TODO: REFACTOR component
  public ngOnInit(): void {
    this.initialSelectedTab$ = this.TabsHelperService.observeInitialSelectedTab();

    this.activatedRoute.data.pipe(
      map((data: { post: IArticlePost }) => data.post),
      takeUntil(this.destroy$)
    ).subscribe((post) => {
      this.setPostData(post);
      this.setControlListeners();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.disable$.complete();
    this.loading$.complete();
    this.post$.complete();
    this.showEditor$.complete();
    this.showToggle$.complete();
    this.TabsHelperService.reset();
  }

  public handleToggle(value: boolean): void {
    this.showEditor$.next(value);
    this.toggleControl('text', value);
  }

  // TODO: refactor needed remove this method
  public emitUploadTabChange(tab: 'image' | 'video' = 'image'): void {
    this.TabsHelperService.emitUploadTabChange(tab);
  }

  public submit(): void {
    if (this.loading$.value || this.articleGroup.invalid) {
      return;
    }

    // TODO: change params!
    this.loading$.next(true);
    const params = this.getParams();
    this.PostsService.updateArticle(this.postId, params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to update an Article.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const msg = 'Article has been successfully updated.';
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
    ).subscribe(() => {});

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
    this.handleToggle(!isVideo || this.hasText);

    // remove / add controls
    this.toggleControl('video', isVideo);
    this.toggleControl('type', isVideo);
    this.toggleControl('image', !isVideo);

    this.setDynamicControls();

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

  private setPostData(article: IArticlePost): void {
    this.postId = article.id;
    this.hasText = !!article.text;
    this.post$.next(article);
    const controls = this.articleGroup.controls;
    controls.category.setValue(article.category);
    controls.title.setValue(article.title);

    this.TabsHelperService.setInitialSelectedTab(article.video ? 1 : 0)
    this.TabsHelperService.emitUploadTabChange(article.video ? 'video' : 'image');
  }

  private setDynamicControls(): void {
    const destroy = new ReplaySubject(1)

    this.post$.pipe(
      takeUntil(destroy)
    ).subscribe((post) => {
      destroy.next(null);
      destroy.complete();

      const controls = this.articleGroup.controls;
      const video = post.video;
      const image = post.image;
      const text = post.text;

      if (text) {
        controls?.text?.setValue(text);
        this.quilEditorValueSetterSubject.next(text);
      }

      if (image) {
        controls?.image?.setValue(image);
        this.TabsHelperService.setimageUrl(image);
      }

      if (video) {
        const data = { url: post.video, type: post.video_type };
        this.TabsHelperService.setVideoData(data);
      }
    });
  }

  private getParams(): IArticleParams {
    const params = this.articleGroup.value;

    if (!params.text) {
      params.text = '';
    }

    if (params.image && typeof params.image === 'string') {
      delete params.image;
    }

    // TODO: handle description properly
    const title = this.domSanitizer.sanitize(SecurityContext.URL, params.title);
    const description = params.text ? this.description.value.trim() : title.trim();
    params.description = description;

    return params;
  }

}
