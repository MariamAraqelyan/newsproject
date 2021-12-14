import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { CommentsService, IComment } from 'src/app/shared/services/comments';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { PostHelperService } from './../../services/post-helper';

@Component({
  selector: 'newsreel-comments-thread',
  templateUrl: './comments-thread.component.html',
  styleUrls: ['./comments-thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsThreadComponent implements OnInit, OnDestroy {
  @Input() public comment: IComment;
  @Input() public postId: number;

  public loading$ = new BehaviorSubject(false);
  public replies$ = new BehaviorSubject<IComment[]>([]);
  public isAllLoaded$ = new BehaviorSubject(false);

  private page = 1;
  private perPage = 5;
  private total: number = null;
  private destroy$ = new ReplaySubject(1);

  constructor(
    private CommentsService: CommentsService,
    private SnackbarService: SnackbarService,
    private PostHelperService: PostHelperService
  ) { }

  public ngOnInit(): void {
    this.getReplies();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.replies$.complete();
    this.isAllLoaded$.complete();
  }

  public trackReplies(index: number, comment: IComment): number {
    return comment.id;
  }

  public getReplies(): void {
    if (this.loading$.value || this.isAllLoaded$.value) {
      return;
    }

    this.loading$.next(true);
    const params = { page: this.page, page_size: this.perPage };
    this.CommentsService.getCommentsReplies(this.comment.id, params).pipe(
      catchError((err) => this.handleError(err, 'Failed to get comment replies.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.total = response.count;

      const isAll = this.total <= (this.page * this.perPage);
      this.isAllLoaded$.next(isAll);

      this.page += 1;

      // ensure that data are unique
      const replies = this.replies$.value;
      const uniqData = response.results.filter((reply) => !replies.find((item) => item.id === reply.id));
      const sortedData = [...replies, ...uniqData].sort((a, b) => Number(a.created_at) - Number(b.created_at));
      this.replies$.next(sortedData);
    });
  }

  public handleReply(reply: IComment): void {
    this.total++;
    this.PostHelperService.emitCommentsIncrease();
    const replies = [...this.replies$.value, reply];
    this.replies$.next(replies);
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

}
