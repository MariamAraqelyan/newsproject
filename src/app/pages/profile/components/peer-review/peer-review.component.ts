import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { IReview, IReviewAnswer, IReviewAuthor } from 'src/app/shared/services/reviews';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'newsreel-peer-review',
  templateUrl: './peer-review.component.html',
  styleUrls: ['./peer-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeerReviewComponent implements OnChanges, OnDestroy {
  @Input() public review: IReview & IReviewAnswer;
  @Input() public isResponse = false;
  @Input() public allowReply = false;
  @Input() public allowReport = false;

  @Output() public vote = new EventEmitter();
  @Output() public report = new EventEmitter();
  @Output() public response = new EventEmitter();

  public userInfo: IReviewAuthor;
  public showInput$ = new BehaviorSubject(false);
  public answer = new FormControl('', [ Validators.required ]);

  public ngOnChanges(): void {
    this.userInfo = this.isResponse ? this.review.user : this.review.author;
  }

  public ngOnDestroy(): void {
    this.showInput$.complete();
  }

  public handleVote(value = true): void {
    this.vote.emit(value);
  }

  public toggleReply(): void {
    const value = !this.showInput$.value;
    this.showInput$.next(value);
  }

  public submitAnswer(): void {
    if (this.answer.invalid) {
      return;
    }

    this.response.emit(this.answer.value);
  }

  public handleReport(): void {
    this.report.emit();
  }

}
