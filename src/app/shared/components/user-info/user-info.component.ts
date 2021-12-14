import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IShortUserInfo } from './user-info.interface';

@Component({
  selector: 'newsreel-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  @Input() public user: IShortUserInfo;
}
