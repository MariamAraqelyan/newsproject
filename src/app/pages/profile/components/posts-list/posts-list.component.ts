import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { IGeneralPost, IGetUserPostsParams, IPost, PostsService } from 'src/app/shared/services/posts';
import { LayoutScrollService } from 'src/app/shared/services/layout-scroll';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { IUser } from 'src/app/shared/services/user';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, filter, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit, OnChanges, OnDestroy {
  public loading$ = new BehaviorSubject(false);
  public posts$ = new BehaviorSubject<IGeneralPost[]>([]);
  public showSpinner$ = new BehaviorSubject(false);

  @Input() private type = '';
  @Input() private exclude = '';
  @Input() private user: IUser;

  private page = 1;
  private perPage = 5;
  private destroy$ = new ReplaySubject(1);
  private isAllLoaded$ = new BehaviorSubject(false);

  constructor(
    private PostsService: PostsService,
    private SnackbarService: SnackbarService,
    private LayoutScrollService: LayoutScrollService
  ) { }

  public ngOnInit(): void {
    this.setScrollListener();
  }

  public ngOnChanges(): void {
    this.resetData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.showSpinner$.complete();
    this.isAllLoaded$.complete();
  }

  public trackPosts(index: number, post: IPost): number {
    return post.id;
  }

  public resetData(): void {
    this.page = 1;
    this.posts$.next([]);
    this.isAllLoaded$.next(false);
    this.getPosts();
  }

  public getPosts(): void {
    if (this.loading$.value || this.isAllLoaded$.value) {
      return;
    }

    const params = this.getParams();
    this.loading$.next(true);
    this.showSpinner$.next(true);
    this.PostsService.getUserPosts(params).pipe(
      catchError((err: IApiError) => this.handleError(err, 'Failed to fetch posts.')),
      finalize(() => {
        this.loading$.next(false);
        this.showSpinner$.next(false);
      }),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      const total = response.count;

      const isAll = total <= (this.page * this.perPage);
      this.isAllLoaded$.next(isAll);

      this.page += 1;

      // ensure that data are unique
      const posts = this.posts$.value;
      const uniqData = response.results.filter((post) => !posts.find((item) => item.id === post.id));
      this.posts$.next([...posts, ...uniqData]);
    });
  }

  public updatePost(post: IGeneralPost): void {
    const currentList = this.posts$.value;
    const index = currentList.findIndex((item) => item.id === post.id);

    if (index === -1) {
      return;
    }

    currentList[index] = post;
    this.posts$.next([...currentList]);
  }

  public removePost(ID: number): void {
    const newList = this.posts$.value.filter((post) => post.id !== ID);
    newList.length ? this.posts$.next(newList) : this.resetData();
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

  private getParams(): IGetUserPostsParams {
    const params = {
      page: this.page,
      page_size: this.perPage,
      id: `${this.user.id}`,
      type: this.type,
      exclude: this.exclude
    };

    if (!params.exclude) {
      delete params.exclude;
    }

    if (!params.type) {
      delete params.type;
    }

    return params;
  }

  private setScrollListener(): void {
    this.LayoutScrollService.observeScrollEnd().pipe(
      filter(() => !this.isAllLoaded$.value),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getPosts());
  }
}
