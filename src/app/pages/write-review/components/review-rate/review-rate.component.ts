import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RATE_FIELDS } from './review-rate.constants';
import { IRateItem } from './review-rate.interface';
import { IUser } from 'src/app/shared/services/user';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-review-rate',
  templateUrl: './review-rate.component.html',
  styleUrls: ['./review-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRateComponent implements OnDestroy {
  @Input() public user: IUser;
  @Output() public rateSelect = new EventEmitter();

  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public fields$ = new BehaviorSubject<IRateItem[]>(RATE_FIELDS);
  public disabled$ = new BehaviorSubject(true);

  constructor(private ConfigService: ConfigService) {}

  public ngOnDestroy(): void {
    this.fields$.complete();
  }

  public trackItem(index: number): number {
    return index;
  }

  public handleStarSelect(value: number, item: IRateItem): void {
    const newlist = this.fields$.value.map((field) => {
      return {
        ...field,
        value: field.key === item.key ? value: field.value
      }
    });

    const isValid = newlist.some((item) => item.value === 0);
    this.disabled$.next(isValid);
    this.fields$.next(newlist);
  }

  public submit(): void {
    if (!this.disabled$.value) {
      this.rateSelect.emit(this.fields$.value);
    }
  }
}
