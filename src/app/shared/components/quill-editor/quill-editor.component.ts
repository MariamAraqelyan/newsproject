import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  SecurityContext,
  ViewEncapsulation
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as Quill from 'quill';

@Component({
  selector: 'newsreel-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class QuillEditorComponent implements AfterViewInit, OnDestroy {
  public editorId = `editor${Math.random().toString().slice(2)}`;
  public toolbarId = `toolbar${Math.random().toString().slice(2)}`;
  public errMsg$ = new BehaviorSubject('');

  @Input() public isExtended = false;
  @Input() private control: FormControl;
  @Input() private textControl: FormControl;
  @Input() private charLimit: number;
  @Input() private incomeChanges$: Observable<string>;

  // TODO: add types
  private editor: any;
  private changeHandler: any;
  private editorElement: HTMLElement;

  private destroy$ = new ReplaySubject(1);

  constructor(
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer
  ) {
  }

  public ngAfterViewInit(): void {
    this.initEditor();
    this.setEditorChangeListener();
    this.setIncomeChangesListener();
    this.setControlValidators();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.errMsg$.complete();
    this.editor.off('text-change', this.changeHandler);
  }

  private initEditor(): void {
    this.editor = new Quill(`#${this.editorId}`, {
      modules: {toolbar: `#${this.toolbarId}`},
      theme: 'snow',
      placeholder: 'Type story here...'
    });

    this.editorElement = this.elementRef.nativeElement.querySelector('.ql-editor');
  }

  private setEditorChangeListener(): void {
    this.changeHandler = (delta, oldDelta, source: 'api' | 'user') => {
      const html = this.editorElement.innerHTML;
      const isEmpty = html === '<p><br></p>' || html === '<div><br></div>';

      const value = isEmpty ? null : this.domSanitizer.sanitize(SecurityContext.HTML, html);
      this.control.markAsDirty();
      this.control.setValue(value);

      if (this.textControl) {
        const dirtyText = this.editor.getText();
        const text = this.domSanitizer.sanitize(SecurityContext.URL, dirtyText);
        this.textControl.markAsDirty();
        this.textControl.setValue(text);
      }
    };

    this.editor.on('text-change', this.changeHandler);
  }

  private setIncomeChangesListener(): void {
    if (!this.incomeChanges$) {
      return;
    }

    this.incomeChanges$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      const safeValue = this.domSanitizer.sanitize(SecurityContext.HTML, value);
      this.editor.clipboard.dangerouslyPasteHTML(safeValue, 'silent');
    });
  }

  private setControlValidators(): void {
    if (!this.charLimit) {
      return;
    }

    const validator = this.getCharLimitValidator();
    this.control.setValidators([validator]);
  }

  private getCharLimitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const limit = this.charLimit;
      const length = this.editor.getText().length - 1; // editor adds /n
      const isLimitExceed = length > this.charLimit;
      const value = `Only ${limit} chars allowed. You have entered ${length}.`;
      const error = {charLimit: {value}};
      this.errMsg$.next(isLimitExceed ? value : '');

      return isLimitExceed ? error : null;
    };
  }

}
