import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'newsreel-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss']
})
export class MobileDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MobileDialogComponent>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
