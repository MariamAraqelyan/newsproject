import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent {
  public isDesktop = this.ConfigService.isDesktop;
  public isMobile = this.ConfigService.isMobile;

  constructor(private ConfigService: ConfigService) {}
}
