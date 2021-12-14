import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent {
  public isDesktop = this.ConfigService.isDesktop;
  public isMobile = this.ConfigService.isMobile;

  constructor(private ConfigService: ConfigService) {}
}
