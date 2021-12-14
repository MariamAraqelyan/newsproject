import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user';

@Component({
  selector: 'newsreel-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopHeaderComponent {
  public user$ = this.UserService.getUser();

  constructor(private UserService: UserService) {}
}
