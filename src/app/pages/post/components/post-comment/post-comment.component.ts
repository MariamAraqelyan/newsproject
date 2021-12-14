import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { CommentsService, IComment } from 'src/app/shared/services/comments';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ConfigService } from 'src/app/shared/services/config';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentComponent implements OnDestroy {
  @Input() public postId: number;
  @Input() public comment: IComment;
  @Input() public allowReply = false;
  @Output() public reply = new EventEmitter<IComment>();

  public isDesktop = this.ConfigService.isDesktop;
  public loading$ = new BehaviorSubject(false);
  public showInput$ = new BehaviorSubject(false);
  public inputControl = new FormControl('', [ Validators.required ]);

  private destroy$ = new ReplaySubject(1);

  constructor(
    private ConfigService: ConfigService,
    private CommentsService: CommentsService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnDestroy(): void {
    this.showInput$.complete();
  }

  public toggleReply(): void {
    const value = !this.showInput$.value;
    this.showInput$.next(value);
  }

  public submitReply(): void {
    if (this.inputControl.invalid || this.loading$.value || !this.allowReply) {
      return;
    }

    this.loading$.next(true);
    const params = { post: this.postId, text: this.inputControl.value, parent_comment: this.comment.id };
    this.CommentsService.addComment(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to add the comment reply.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((comment) => {
      this.reply.emit(comment);
      this.inputControl.reset();
      this.toggleReply();
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

}
