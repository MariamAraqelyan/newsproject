import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { UserService, Roles } from 'src/app/shared/services/user';
import { AuthService } from 'src/app/shared/services/auth';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: '[neewsreelAllowForRoles]'
})
export class AllowForRolesDirective implements OnInit, OnDestroy {
  @Input() neewsreelAllowForRoles: Roles[] = [];

  private hasView = false;
  private destroy$ = new ReplaySubject(1);

  constructor(
    private AuthService: AuthService,
    private UserService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private changes: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.UserService.getUser().pipe(
      takeUntil(this.destroy$)
    ).subscribe((user) => {
      const role = this.AuthService.isLoggedIn() ? user?.role : Roles.Guest;
      const hasPassedRoleCheck = this.checkRolePermissions(role);

      hasPassedRoleCheck ? this.addView() : this.removeView();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private checkRolePermissions(currentRole: Roles): boolean {
    return this.neewsreelAllowForRoles.some((role) => currentRole === role);
  }

  private removeView(): void {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private addView(): void {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.changes.markForCheck();
      this.hasView = true;
    }
  }
}
