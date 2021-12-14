import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';

@Component({
  selector: 'newsreel-report-harmful-content',
  templateUrl: './report-harmful-content.component.html',
  styleUrls: ['./report-harmful-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportHarmfulContentComponent {
  public isDesktop = this.ConfigService.isDesktop;
  public isMobile = this.ConfigService.isMobile;

  constructor(private ConfigService: ConfigService) {}
}
