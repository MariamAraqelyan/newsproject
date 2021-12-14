import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { ReportsService } from 'src/app/shared/services/reports';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-report-btn',
  templateUrl: './report-btn.component.html',
  styleUrls: ['./report-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportBtnComponent implements OnDestroy {
  public loading$ = new BehaviorSubject(false);

  @Input() public isReported = false;
  @Input() private postId: number;
  @Output() private report = new EventEmitter();

  private destroy$ = new ReplaySubject(1);

  constructor(
    private ReportsService: ReportsService,
    private SnackbarService: SnackbarService
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
  }

  public handleReport(): void {
    if (this.loading$.value || this.isReported) {
      return;
    }

    this.loading$.next(true);
    const params = { post: this.postId };
    this.ReportsService.report(params).pipe(
      catchError((err) => {
        this.SnackbarService.error('Failed to report the post.');

        return throwError(err);
      }),
      takeUntil(this.destroy$),
      finalize(() => this.loading$.next(false))
    ).subscribe(() => {
      this.report.emit();
      this.SnackbarService.success('Post was successfull reported.');
    });
  }

}
