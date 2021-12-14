import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/shared/services/user';

@Component({
  selector: 'newsreel-reviews-modal',
  templateUrl: './reviews-modal.component.html',
  styleUrls: ['./reviews-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsModalComponent {
  public user: IUser = this.data.user;

  constructor(
    private dialogRef: MatDialogRef<ReviewsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: IUser; }
  ) { }

  public close(value = false): void {
    this.dialogRef.close(value);
  }
}
