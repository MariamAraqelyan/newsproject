import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { IArticlePost, PostsService } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import {IUser, UserService} from "../../../../shared/services/user";

@Component({
  selector: 'newsreel-mob-article',
  templateUrl: './mob-article.component.html',
  styleUrls: ['./mob-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobArticleComponent implements OnChanges, OnDestroy {
  @Input() public article: IArticlePost;

  public content$ = new BehaviorSubject('');
  public isYoutube$ = new BehaviorSubject(false);
  public url$ = new ReplaySubject<SafeResourceUrl>(1);

  private destroy$ = new ReplaySubject(1);
  private loading$ = new BehaviorSubject(false);
  private isLogin: boolean;

  @Output() private change = new EventEmitter<IArticlePost>();

  constructor(
    private domSanitizer: DomSanitizer,
    private ConfigService: ConfigService,
    private PostsService: PostsService,
    private SnackbarService: SnackbarService,
    private UserService: UserService
  ) {
    this.UserService.getUser().subscribe((data: IUser | null) => {
      this.isLogin = data ? true : false;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.article) {
      return;
    }

    const current = changes.article.currentValue as IArticlePost;
    const old = changes.article.previousValue as IArticlePost;

    if (current?.id !== old?.id) {
      this.setContent();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.content$.complete();
    this.isYoutube$.complete();
    this.url$.complete();
  }

  public upvote(): void {
    const post = this.article;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    if(this.isLogin) {
      this.PostsService.upvotePost(post.id).pipe(
        catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the article.')),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      ).subscribe((article) => this.change.emit(article as IArticlePost));
    }
  }

  public report(): void {
    // some
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

  private setContent(): void {
    const dirtyContent = this.article.text;
    const content = this.domSanitizer.sanitize(SecurityContext.HTML, this.article.text);
    this.content$.next(content);

    if (this.article.video) {
      this.isYoutube$.next(this.article.video_type === 'youtube');
      const dirtyUrl = this.getVideoURL();
      const clean = this.domSanitizer.sanitize(SecurityContext.URL, dirtyUrl);
      const url = this.domSanitizer.bypassSecurityTrustResourceUrl(clean);
      this.url$.next(url);
    }
  }

  private getVideoURL(): string {
    const id = this.article.video_id;
    const origin = this.ConfigService.config.domain;
    const youtube = `https://www.youtube.com/embed/${id}?controls=1&modestbranding=1&enablejsapi=1&widget_referrer=1&origin=${origin}$rel=0&autoplay=1`;
    const vimeo = `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&autoplay=1`;

    return this.isYoutube$.value ? youtube : vimeo;
  }

}
