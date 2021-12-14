import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICategory } from '../inline-navbar/inline-navbar.interface';
import { AuthService } from 'src/app/shared/services/auth';
import { Roles } from 'src/app/shared/services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'newsreel-aside-navbar',
  templateUrl: './aside-navbar.component.html',
  styleUrls: ['./aside-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideNavbarComponent {
  public Roles = Roles;

  @Input() categories: ICategory[] = [];

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) { }

  public logout(): void {
    this.AuthService.logout().subscribe(() => this.router.navigate(['/']));
  }

  public trackCategories(index: number, category: ICategory): string {
    return category.label;
  }
}
