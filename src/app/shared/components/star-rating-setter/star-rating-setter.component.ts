import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'newsreel-star-rating-setter',
  templateUrl: './star-rating-setter.component.html',
  styleUrls: ['./star-rating-setter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingSetterComponent implements OnInit, OnDestroy {
  @Input() public starsAmount = 5;
  @Output() public select = new EventEmitter();

  public starList = [];
  public selectedValue$ = new BehaviorSubject(0);
  public hoverValue$ = new BehaviorSubject(0);

  public ngOnInit(): void {
    this.starList = Array.from({ length: this.starsAmount }, (v, i) => i);
  }

  public ngOnDestroy(): void {
    this.selectedValue$.complete();
    this.hoverValue$.complete();
  }

  public trackStars(index: number, value: number): number {
    return index;
  }

  public selectStar(value: number): void {
    this.selectedValue$.next(value);
    this.select.emit(value);
  }

  public setHoverValue(value = 0): void {
    this.hoverValue$.next(value);
  }

}
