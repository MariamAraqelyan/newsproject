import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-create-tab',
  templateUrl: './create-tab.component.html',
  styleUrls: ['./create-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTabComponent {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;

  constructor(private ConfigService: ConfigService) { }

}
