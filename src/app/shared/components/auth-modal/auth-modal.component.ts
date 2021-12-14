import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'newsreel-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnDestroy {
  public step$ = new BehaviorSubject('sign-in');

  constructor(private dialogRef: MatDialogRef<AuthModalComponent>) { }

  public ngOnInit(): void {
    // some logic
  }

  public ngOnDestroy(): void {
    this.step$.complete();
  }

  public handleStepChange(name: string): void {
    this.step$.next(name);
  }

  public close(): void {
    this.dialogRef.close();
  }

}
