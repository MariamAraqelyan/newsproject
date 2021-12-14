import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DEFAULT_ERRROR_MESSAGES } from './text-input.constants';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent implements OnInit, OnChanges {
  @Input() public icon = '';
  @Input() public label = '';
  @Input() public type = 'text';
  @Input() public placeholder = '';
  @Input() public control: FormControl;
  @Input() public inputId = `${Math.random()}`;
  @Input() public customMessages: { [key: string]: string } = {};
  @Input() public customTrigger$: Observable<any>;

  public messageMap: { [key: string]: string } = {};
  public message$ = new BehaviorSubject('');

  @ViewChild('input') private input: ElementRef<HTMLInputElement>;
  private destroy$ = new Subject();

  public ngOnInit(): void {
    this.setControlEventsListener();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.messageMap = {
      ...DEFAULT_ERRROR_MESSAGES,
      ...(this.customMessages || {})
    };

    const change = changes.customMessages;

    if (change && !change.isFirstChange()) {
      this.checkForErrors();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private checkForErrors(): void {
    const { invalid, dirty, touched } = this.control;
    const isFocused = this.input.nativeElement === document.activeElement;
    const isControlStateValid = invalid && (dirty || touched);
    const isMessageNeeded = isControlStateValid && !isFocused;

    const msg = isMessageNeeded ? this.messageMap[this.getFirstErrorName()] : '';
    this.message$.next(msg);
  }

  private getFirstErrorName(): string {
    return Object.keys(this.control.errors)[0];
  }

  private setControlEventsListener(): void {
    merge(
      this.control.valueChanges,
      this.control.statusChanges
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.checkForErrors());

    if (this.customTrigger$) {
      this.customTrigger$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => this.checkForErrors());
    }
  }
}
