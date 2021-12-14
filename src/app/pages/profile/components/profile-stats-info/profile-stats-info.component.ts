import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';
import { IUser } from 'src/app/shared/services/user';

@Component({
  selector: 'newsreel-profile-stats-info',
  templateUrl: './profile-stats-info.component.html',
  styleUrls: ['./profile-stats-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileStatsInfoComponent {
  @Input() public user: IUser;
  public isMobile = this.ConfigServise.isMobile;
  public isDesktop = this.ConfigServise.isDesktop;

  constructor(private ConfigServise: ConfigService) { }

  public convertValue(value: number): string {
    return `${value > 1000 ? (value / 1000).toFixed() + 'k' : value }`
  }
}
