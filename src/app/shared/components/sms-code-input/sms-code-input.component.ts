import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NON_DIGIT_REGEX } from 'src/app/shared/utils/constants';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'newsreel-sms-code-input',
  templateUrl: './sms-code-input.component.html',
  styleUrls: ['./sms-code-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmsCodeInputComponent implements OnInit, OnDestroy {
  @Input() public codeLength = 6;
  @Input() public control: FormControl;
  public ID = `${Math.random()}`;
  public lines: number[];

  private destroy$ = new ReplaySubject(1);
  @ViewChild('input') private input: ElementRef<HTMLInputElement>;

  @HostListener('window:keydown', ['$event']) handleKeypress({ key }: KeyboardEvent) : void {
    if (document.activeElement === this.input.nativeElement) {
      return;
    }

    const current = this.control.value;
    const control =this.control;

    if (key === 'Backspace') {
      const value = current.slice(0, current.length - 1);
      control.setValue(value);

      return control.markAsDirty();
    }

    if (current.length < this.codeLength) {
      const value = current + key;
      control.setValue(value);
      control.markAsDirty();

      return;
    }
  }

  public ngOnInit(): void {
    this.setControlListener();
    this.lines = Array.from({ length: this.codeLength }, (v, i) => i);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public trackLines(index: number): number {
    return index;
  }

  private setControlListener(): void {
    this.control.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((value: string) => {
      const newValue = value.replace(NON_DIGIT_REGEX, '');
      this.control.setValue(newValue);
    });
  }

}
