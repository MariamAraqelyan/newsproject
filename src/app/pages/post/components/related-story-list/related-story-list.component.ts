import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, Input } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { IArticlePost, PostsService } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-related-story-list',
  templateUrl: './related-story-list.component.html',
  styleUrls: ['./related-story-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedStoryListComponent implements OnChanges, OnDestroy {
  public isMobile = this.ConfigService.isMobile;
  public loading$ = new BehaviorSubject(false);
  public stories$ = new BehaviorSubject<IArticlePost[]>([]);

  @Input() public postId: number;

  private destroy$ = new ReplaySubject(1);

  constructor(
    private PostsService: PostsService,
    private ConfigService: ConfigService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnChanges(): void {
    this.getStories();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.stories$.complete();
  }

  public trackStory(index: number, story: IArticlePost): number {
    return story.id;
  }

  public updatePost(post: IArticlePost): void {
    const currentList = this.stories$.value;
    const index = currentList.findIndex((item) => item.id === post.id);

    if (index === -1) {
      return;
    }

    currentList[index] = post;
    this.stories$.next([...currentList]);
  }

  public removePost(ID: number): void {
    const newList = this.stories$.value.filter((post) => post.id !== ID);
    newList.length ? this.stories$.next(newList) : this.getStories();
  }

  private getStories(): void {
    if (this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.PostsService.getRelatedStories(this.postId).pipe(
      catchError((err: IApiError) => this.handleError(err, 'Failed to fetch related stories.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((stories) => this.stories$.next(stories));
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

}
