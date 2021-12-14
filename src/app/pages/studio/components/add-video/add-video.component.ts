import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TYPES } from './add-video.constants';
import { TabsHelperService } from './../../services/tabs-helper';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'newsreel-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddVideoComponent implements OnInit, OnDestroy {
  public videoTypes = TYPES;
  public video = this.fb.group({ type: '', url: '' });

  @Input() public isDesktop = false;

  private destroy$ = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private TabsHelperService: TabsHelperService
  ) { }

  public ngOnInit(): void {
    this.video.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      takeUntil(this.destroy$)
    ).subscribe((value: { type: string; url: string }) => this.TabsHelperService.emitVideo(value));

    this.TabsHelperService.observeVideoDataSet().pipe(
      filter((data) => !!data),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      const controls = this.video.controls;
      controls.type.setValue(data.type);
      controls.url.setValue(data.url);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
