import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConfigService } from 'src/app/shared/services/config';
import { IUser } from 'src/app/shared/services/user';

@Component({
  selector: 'newsreel-profile-main-info',
  templateUrl: './profile-main-info.component.html',
  styleUrls: ['./profile-main-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileMainInfoComponent {
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;

  @Input() public user: IUser;

  constructor(private ConfigService: ConfigService) { }

}
