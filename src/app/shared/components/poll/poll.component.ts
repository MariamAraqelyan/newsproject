import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnChanges, Output} from '@angular/core';
import {getMessageFromApiError, IApiError} from 'src/app/shared/utils/api-error-handling';
import {IChoice, IPollPost, PostsService} from 'src/app/shared/services/posts';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ReportsService} from 'src/app/shared/services/reports';
import {IUser, UserService} from 'src/app/shared/services/user';
import {FormControl, Validators} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';
import {BehaviorSubject, Observable, ReplaySubject, throwError} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'newsreel-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollComponent implements OnChanges, OnDestroy {
  @Input() public poll: IPollPost;
  @Input() public showFooterBtnPanel = true;

  public user$ = this.UserService.getUser();
  public voteResult = new FormControl('', Validators.required);
  public isVoted$ = new BehaviorSubject(false);

  private destroy$ = new ReplaySubject(1);
  private loading$ = new BehaviorSubject(false);
  private isLogin: boolean;

  @Output() private change = new EventEmitter<IPollPost>();
  @Output() private delete = new EventEmitter<number>();

  constructor(
    private UserService: UserService,
    private PostsService: PostsService,
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService
  ) {
    this.user$.subscribe((data: IUser | null) => {
      this.isLogin = data ? true : false;
    });
  }

  public ngOnChanges(): void {
    const value = this.poll?.choices.some((choice) => choice.is_voted);
    this.isVoted$.next(!!value);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.isVoted$.complete();
  }

  public trackChoices(index: number, choice: IChoice): number {
    return choice.id;
  }

  public selectPollValue(event: MatRadioChange): void {
    if (this.loading$.value) {
      return;
    }

    this.loading$.next(true);
    this.PostsService.votePoll(this.poll.id, event.value).pipe(
      catchError((err: IApiError) => this.handleError(err, 'Failed to vote the poll.')),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe((poll) => this.change.emit(poll));
  }

  public upvote(): void {
    const post = this.poll;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    if (this.isLogin) {
      this.PostsService.upvotePost(post.id).pipe(
        catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the post.')),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      ).subscribe((poll) => this.change.emit(poll as IPollPost));
    }
  }

  public report(): void {
    if (this.loading$.value || this.poll.reported) {
      return;
    }

    this.loading$.next(true);
    const params = {post: this.poll.id};
    this.ReportsService.report(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to report the poll.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      const poll = {...this.poll, reported: true};
      this.change.emit(poll);
      this.SnackbarService.success('Poll has been successfully reported.');
    });
  }

  public handleDelete(): void {
    if (this.loading$.value) {
      return;
    }

    const ID = this.poll.id;
    this.loading$.next(true);
    this.PostsService.deletePost(ID).pipe(
      catchError((err) => this.handleError(err, 'Failed to delete the poll.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      this.delete.emit(ID);
      this.SnackbarService.success('Poll has been successfully deleted.');
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }

}
