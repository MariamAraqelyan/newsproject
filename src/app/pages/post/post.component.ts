import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {SocialShareModalComponent} from 'src/app/shared/components/social-share-modal';
import {IGeneralPost, PostsService} from 'src/app/shared/services/posts';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ConfigService} from 'src/app/shared/services/config';
import {MetaService} from 'src/app/shared/services/meta';
import {UserService} from 'src/app/shared/services/user';
import {ActivatedRoute, Router} from '@angular/router';
import {PostHelperService} from './services/post-helper';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, ReplaySubject, throwError} from 'rxjs';
import {catchError, filter, map, retry, takeUntil} from 'rxjs/operators';
import {SocialShareComponent} from "../../shared/components/social-share/social-share.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'newsreel-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public post$ = new ReplaySubject<IGeneralPost>(1);
  public shareLink$ = new ReplaySubject(1);

  private postSlug: string;
  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private MetaService: MetaService,
    private ConfigService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private PostsService: PostsService,
    private UserService: UserService,
    private SnackbarService: SnackbarService,
    private PostHelperService: PostHelperService,
    private _bottomSheet: MatBottomSheet
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map((data: { post: IGeneralPost }) => data.post),
      takeUntil(this.destroy$)
    ).subscribe((post) => this.handlePostChange(post));

    this.PostHelperService.observeCommentsIncrease().pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.updateCounter());

    this.reloadPostOnUserChange();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.post$.complete();
    this.shareLink$.complete();
  }

  // TODO: refactor
  public handleReport(): void {
    const destroy = new ReplaySubject(1);

    this.post$.pipe(
      takeUntil(destroy)
    ).subscribe((post) => {
      destroy.next(null);
      destroy.complete();

      post.reported = true;
      this.post$.next({...post});
    });
  }

  public updatePost(post: IGeneralPost): void {
    this.post$.next(post);
  }

  public repost(): void {
    const destroy = new ReplaySubject(1);

    this.post$.pipe(
      takeUntil(destroy)
    ).subscribe((post) => {
      destroy.next(null);
      destroy.complete();
      this._bottomSheet.open(SocialShareComponent);
      // this.dialog.open(SocialShareModalComponent, {
      //   width: '90vw',
      //   maxWidth: '650px',
      //   data: {post}
      // });
    });
  }

  // TODO: refactor
  private updateCounter(): void {
    const destroy = new ReplaySubject();
    this.post$.pipe(
      takeUntil(destroy)
    ).subscribe((post) => {
      destroy.next(null);
      destroy.complete();
      post.comments++;
      this.post$.next({...post});
    });
  }

  private handlePostChange(post: IGeneralPost): void {
    this.postSlug = post.slug;
    this.post$.next(post);
    const link = window.location.host + this.router.url;
    this.shareLink$.next(link);
  }

  private reloadPostOnUserChange(): void {
    let loadedUserId = this.UserService.getCurrentUserId();

    // TODO: refactor, use Auth observe auth status change
    this.UserService.getUser().pipe(
      filter((user) => loadedUserId !== user?.id),
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      loadedUserId = user?.id;
      this.reloadPost();
    });
  }

  private reloadPost(): void {
    this.PostsService.getPostBySlug(this.postSlug).pipe(
      catchError((err) => {
        this.SnackbarService.error('Failed to fetch a post!');
        this.router.navigate(['/']);

        return throwError(err);
      }),
      retry(1),
      takeUntil(this.destroy$)
    ).subscribe((post) => this.handlePostChange(post));
  }

}
