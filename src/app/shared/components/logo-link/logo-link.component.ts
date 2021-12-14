import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'newsreel-logo-link',
  templateUrl: './logo-link.component.html',
  styleUrls: ['./logo-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoLinkComponent { }
