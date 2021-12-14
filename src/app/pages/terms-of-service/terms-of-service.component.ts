import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsOfServiceComponent {
  public isDesktop = this.ConfigService.isDesktop;
  public isMobile = this.ConfigService.isMobile;

  constructor(private ConfigService: ConfigService) {}
}
