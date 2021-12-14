import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {IStarItem} from './star-rating.interface';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'newsreel-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnChanges, OnDestroy {
  @Input() public rate = 0;
  @Input() public starsAmount = 5;
  @Input() public isShort = false;
  @Input() public showRateLast = false;
  @Input() public allowResponsive = false;
  @Input() public quantity: number = null;
  @Input() public dynamicSize: boolean = false;

  public showQuantity: boolean;
  public starList$ = new BehaviorSubject<IStarItem[]>([]);

  public ngOnChanges(): void {
    this.setStarList();
    this.showQuantity = this.quantity !== null && !Number.isNaN(+this.quantity);
  }

  public ngOnDestroy(): void {
    this.starList$.complete();
  }

  public trackStars(index: number, item: IStarItem): number {
    return item.star;
  }

  private setStarList(): void {
    const rate = this.rate;
    const sample = Array.from({length: this.starsAmount}, (v, i) => i + 1);
    const starList = sample.map((star) => {
      const isDecimal = Math.abs(rate - star) < 1;
      const isFilled = star <= rate || isDecimal;
      const isHalfStar = star > rate && isDecimal;

      return {star, isFilled, isHalfStar};
    });

    this.starList$.next(starList);
  }
}
