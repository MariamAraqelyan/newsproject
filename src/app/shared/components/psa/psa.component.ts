import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SecurityContext, OnDestroy } from '@angular/core';
import { getMessageFromApiError, IApiError } from 'src/app/shared/utils/api-error-handling';
import { IPsaPost, PostsService } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ReportsService } from 'src/app/shared/services/reports';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import {IUser, UserService} from "../../services/user";

@Component({
  selector: 'newsreel-psa',
  templateUrl: './psa.component.html',
  styleUrls: ['./psa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsaComponent implements OnInit, OnDestroy {
  @Input() public psa: IPsaPost;
  @Input() public showFooterBtnPanel = true;
  public content: string;

  private destroy$ = new ReplaySubject(1);
  private loading$ = new BehaviorSubject(false);

  @Output() private change = new EventEmitter<IPsaPost>();
  @Output() private delete = new EventEmitter<number>();

  public isLogin: boolean;

  constructor(
    private domSanitizer: DomSanitizer,
    private PostsService: PostsService,
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService,
    private UserService: UserService
  ) {
    this.UserService.getUser().subscribe((data: IUser | null) => {
      this.isLogin = data ? true : false;
    });
  }

  public ngOnInit(): void {
    this.content = this.domSanitizer.sanitize(SecurityContext.HTML, this.psa.text);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
  }

  public upvote(): void {
    const post = this.psa;

    if (this.loading$.value || post.is_upvoted) {
      return;
    }

    this.loading$.next(true);
    if(this.isLogin) {
      this.PostsService.upvotePost(post.id).pipe(
        catchError((err: IApiError) => this.handleError(err, 'Failed to upvote the PSA.')),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      ).subscribe((psa) => this.change.emit(psa as IPsaPost));
    }
  }

  public report(): void {
    if (this.loading$.value || this.psa.reported) {
      return;
    }

    this.loading$.next(true);
    const params = { post: this.psa.id };
    this.ReportsService.report(params).pipe(
      catchError((err) => this.handleError(err, 'Failed to report the PSA.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      const psa = { ...this.psa, reported: true };
      this.change.emit(psa);
      this.SnackbarService.success('PSA has been successfully reported.');
    });
  }

  public handleDelete(): void {
    if (this.loading$.value) {
      return;
    }

    const ID = this.psa.id;
    this.loading$.next(true);
    this.PostsService.deletePost(ID).pipe(
      catchError((err) => this.handleError(err, 'Failed to delete the PSA.')),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      this.delete.emit(ID);
      this.SnackbarService.success('PSA has been successfully deleted.');
    });
  }

  private handleError(err: IApiError, defaultMsg: string): Observable<never> {
    const msg = getMessageFromApiError(err, defaultMsg);
    this.SnackbarService.error(msg);

    return throwError(err);
  }
}
