import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DEFAULT_OPTIONS } from './snackbar.constants';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private MatSnackBar: MatSnackBar) {}

  public success(msg: string, options: MatSnackBarConfig = {}): void {
    const OPTIONS: MatSnackBarConfig = {
      ...DEFAULT_OPTIONS,
      panelClass: 'neewsreel-snackbar',
      ...options
    };

    const snackBarRef = this.MatSnackBar.open(msg, '✕', OPTIONS);
    const sub = snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
      sub.unsubscribe();
    });
  }

  public error(msg: string, options: MatSnackBarConfig = {}): void {
    const OPTIONS: MatSnackBarConfig = {
      ...DEFAULT_OPTIONS,
      panelClass: ['neewsreel-snackbar', 'neewsreel-error-snackbar'],
      ...options
    };

    const snackBarRef = this.MatSnackBar.open(msg, '✕', OPTIONS);
    const sub = snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
      sub.unsubscribe();
    });
  }
}
