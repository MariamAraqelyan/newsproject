import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-repost-tab',
  templateUrl: './repost-tab.component.html',
  styleUrls: ['./repost-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepostTabComponent {
  public isMobile = this.ConfigService.isMobile;

  constructor(private ConfigService: ConfigService) { }
}
