import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser, UserService, Roles } from 'src/app/shared/services/user';
import { ConfigService } from 'src/app/shared/services/config';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { LegalPagesMenuComponent } from 'src/app/shared/components/legal-pages-menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'newsreel-mob-header',
  templateUrl: './mob-header.component.html',
  styleUrls: ['./mob-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobHeaderComponent {
  public isMobile: boolean = this.ConfigService.isMobile;
  public user$: Observable<IUser> = this.UserService.getUser();
  public Roles = Roles;

  @Input() public isMainDisplay = true;
  @Input() public showBtnSection = true;
  @Output() public back = new EventEmitter();

  constructor(
    private ConfigService: ConfigService,
    private UserService: UserService,
    private MatBottomSheet: MatBottomSheet
  ) { }

  public openTermsWidget(): void {
    const config: MatBottomSheetConfig = {
      backdropClass: 'neewsreel-bottom-sheet'
    };

    this.MatBottomSheet.open(LegalPagesMenuComponent, config);
  }

  public handleBackBtnClick(): void {
    this.back.emit();
  }
}
