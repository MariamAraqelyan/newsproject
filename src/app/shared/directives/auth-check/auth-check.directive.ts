import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthModalComponent } from 'src/app/shared/components/auth-modal';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth';

@Directive({
  selector: '[newsreelAuthCheck]'
})
export class AuthCheckDirective {
  private modal: MatDialogRef<AuthModalComponent>;
  @Output() private allow = new EventEmitter();

  @HostListener('click', ['$event']) private handleClick(event: Event) {
    this.checkPermission();
  }

  constructor(
    private dialog: MatDialog,
    private AuthService: AuthService
  ) { }

  private checkPermission(): void {
    // add check for phone verification
    this.AuthService.isLoggedIn() ? this.allow.emit() : this.openAuthModal();
  }


  private openAuthModal(): void {
    if (this.modal) {
      return;
    }

    const config: MatDialogConfig = {
      maxHeight: '80vh',
      maxWidth: '90vw',
      autoFocus: false,
      backdropClass: 'neewsreel-backdrop-container'
    };

    this.modal = this.dialog.open(AuthModalComponent, config);

    const sub = this.modal.afterClosed().subscribe(() => {
      sub.unsubscribe();
      this.modal = null;
    });
  }
}
