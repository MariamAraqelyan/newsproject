import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/shared/services/auth';
import { Roles } from 'src/app/shared/services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'newsreel-legal-pages-menu',
  templateUrl: './legal-pages-menu.component.html',
  styleUrls: ['./legal-pages-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalPagesMenuComponent {
  public Roles = Roles;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private bottomSheetRef: MatBottomSheetRef<LegalPagesMenuComponent>
  ) { }

  public logout(): void {
    this.AuthService.logout().subscribe(() => this.router.navigate(['/']));
  }

  public close(): void {
    this.bottomSheetRef.dismiss();
  }
}
