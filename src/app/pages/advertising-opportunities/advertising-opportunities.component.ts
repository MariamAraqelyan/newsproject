import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-advertising-opportunities',
  templateUrl: './advertising-opportunities.component.html',
  styleUrls: ['./advertising-opportunities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvertisingOpportunitiesComponent {
  public isDesktop = this.ConfigService.isDesktop;
  public isMobile = this.ConfigService.isMobile;

  constructor(private ConfigService: ConfigService) {}
}

