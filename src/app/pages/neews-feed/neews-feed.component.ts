import {ChangeDetectionStrategy, Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {getMessageFromApiError, IApiError} from 'src/app/shared/utils/api-error-handling';
import {NewsfeedService, INewsfeedParams, INewsfeedParamsByFilter} from 'src/app/shared/services/newsfeed';
import {LayoutScrollService} from 'src/app/shared/services/layout-scroll';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ConfigService} from 'src/app/shared/services/config';
import {AuthService} from 'src/app/shared/services/auth';
import {IGeneralPost} from 'src/app/shared/services/posts';
import {BehaviorSubject, Observable, ReplaySubject, throwError} from 'rxjs';
import {catchError, filter, finalize, retry, takeUntil} from 'rxjs/operators';
import {IUser} from '../../shared/services/user';
import {MatDialog} from '@angular/material/dialog';
import {MobileDialogComponent} from './mobile-dialog/mobile-dialog.component';

@Component({
  selector: 'newsreel-neews-feed',
  templateUrl: './neews-feed.component.html',
  styleUrls: ['./neews-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeewsFeedComponent implements OnInit, AfterViewInit, OnDestroy {
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public showSpinner$ = new BehaviorSubject(false);
  public posts$ = new BehaviorSubject<IGeneralPost[]>([]);
  public isAllLoaded$ = new BehaviorSubject(false);
  public user$: Observable<IUser>;

  private page = 1;
  private perPage = 5;
  private category: string;
  private destroy$ = new ReplaySubject(1);

  public postTypeList: Array<any> = [
    {
      'name': 'Hot',
      'icon': 'hot-image',
      'type': 'last_3_days_upvotes'
    },
    {
      'name': 'New',
      'icon': 'new-image',
      'type': 'newest'
    },
    {
      'name': 'Subscribed',
      'icon': 'subscribed-image',
      'type': 'subscribed'
    },
    {
      'name': 'Trusted',
      'icon': 'trusted-image',
      'type': 'trusted'
    },
    {
      'name': 'Controversial',
      'icon': 'controversial-image',
      'type': 'controversial'
    }
  ];

  public featuredCreatorsList = [];

  public selectedTypeIndex: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ConfigService: ConfigService,
    private AuthService: AuthService,
    private NewsfeedService: NewsfeedService,
    private SnackbarService: SnackbarService,
    private LayoutScrollService: LayoutScrollService,
    public dialog: MatDialog
  ) {

  }

  public ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.data.category;
    this.setScrollListener();
    this.resetData();

    const filterValue = JSON.parse(sessionStorage.getItem('postFilterKey'));

    if (this.AuthService.isLoggedIn) {
      if (filterValue) {
        this.checkOldFilter();
      } else {
        setTimeout(() => {
          const filterNewValue = JSON.parse(sessionStorage.getItem('postFilterKey'));
          if (filterNewValue) {
            this.checkOldFilter();
          }
        }, 3000);
      }
    }

    this.ConfigService.filterData.subscribe((data: any) => {
      this.changePostType(data.selectedType, data.selectedIndex);
    });

    this.AuthService.creatorsList().subscribe((responseData) => {
      this.featuredCreatorsList = responseData['results'];
    });

  }

  ngAfterViewInit(): void {
    this.AuthService.observeAuthStatusChange().pipe(
      takeUntil(this.destroy$)
    ).subscribe((isLogged) => {
        this.resetData();
        if (isLogged) {
          setTimeout(() => {
            this.checkOldFilter();
          }, 4000);
        } else {
          sessionStorage.setItem('postFilterKey', null);
          this.selectedTypeIndex = null;
        }
      }
    );
  }

  public checkOldFilter(): void {
    const filterValue = JSON.parse(sessionStorage.getItem('postFilterKey'));
    if (filterValue) {
      this.postTypeList.filter((item, index: number) => {
        if (item.type === filterValue) {
          this.changePostType(item.type, index);
          this.selectedTypeIndex = index;
        }
      });

    }
  }

  public changePostType(type, index): void {
    this.selectedTypeIndex = index;
    this.page = 1;
    sessionStorage.setItem('postFilterKey', JSON.stringify(type));
    this.isAllLoaded$.next(false);
    this.getPosts(true);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.showSpinner$.complete();
    this.isAllLoaded$.complete();
  }

  public trackPosts(index: number, post: IGeneralPost): number {
    return post.id;
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

  private resetData(): void {
    this.isAllLoaded$.next(false);
    this.posts$.next([]);
    this.page = 1;
    this.getPosts();
  }

  private getPosts(byChangeFilter: boolean = false): void {
    if (this.loading$.value || this.isAllLoaded$.value) {
      return;
    }

    const filterValue = JSON.parse(sessionStorage.getItem('postFilterKey'));
    const params: INewsfeedParams = {
      order_by: filterValue ? filterValue : null,
      page: this.page,
      page_size: this.perPage,
      category: this.category
    };

    if (!filterValue) {
      delete params.order_by;
    }


    if (params.category === 'trending') {
      delete params.category;
    }

    this.loading$.next(true);
    this.showSpinner$.next(true);
    this.NewsfeedService.getNews(params).pipe(
      retry(1),
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
      // const uniqData = response.results.filter((post) => !posts.find((item) => item.id === post.id));
      // this.posts$.next([...posts, ...uniqData]);

      const uniqData = response.results.filter((post) => !posts.find((item) => item.id === post.id));
      if (byChangeFilter) {
        this.posts$.next(response.results);
      } else {
        this.posts$.next([...posts, ...uniqData]);
      }
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

  private setScrollListener(): void {
    this.LayoutScrollService.observeScrollEnd().pipe(
      filter(() => !this.isAllLoaded$.value),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getPosts());
  }

  shareByTwitter(): void {
    const widget = 'https://twitter.com/intent/tweet?url=';

    if (!widget) {
      return;
    }

    const url = 'Check%20out%20this%20new%20platform%20where%20news%20is%20created%20and%20rated%20by%20the%20users%20on%20the%20platform%20called%20Newsreel%20https%3A%2F%2Fnews-reel2.herokuapp.com%2F';

    const shareLink = `${widget}${url}`;
    const popup = window.open(shareLink, '', `height=570,width=962`);

    if (!popup) {
      this.SnackbarService.error('We couldn\'t open a popup. Please, check if popups are allowed and try again.');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MobileDialogComponent, {
      width: '230px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
