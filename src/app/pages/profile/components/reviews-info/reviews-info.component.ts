import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { IUser } from 'src/app/shared/services/user';
import { IReviewItem } from './reviews-info.interface';
import { FIELDS } from './reviews-info.constants';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-reviews-info',
  templateUrl: './reviews-info.component.html',
  styleUrls: ['./reviews-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsInfoComponent implements OnChanges {
  public rateList: IReviewItem[] = [];
  public isDesktop = this.ConfigService.isDesktop;

  @Input() private user: IUser;

  constructor(private ConfigService: ConfigService) { }

  public ngOnChanges(): void {
    this.rateList = FIELDS.map((key) => ({ label: key, value: this.user[key] }));
  }

  public trackField(index: number, item: IReviewItem): string {
    return item.label;
  }

}
