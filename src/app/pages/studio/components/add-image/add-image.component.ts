import { ChangeDetectionStrategy, Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { IFileObj } from 'src/app/shared/components/file-uploader';
import { TabsHelperService } from './../../services/tabs-helper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'newsreel-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AddImageComponent implements OnDestroy {
  @Input() public text = 'Add Thumbnail Image';
  @Input() public isDesktop = false;

  // public imageMsg$ = new BehaviorSubject('*This field is required');
  public imageMsg$ = new BehaviorSubject('');
  public imageUrl$ = this.TabsHelperService.getImageUrl();

  constructor(private TabsHelperService: TabsHelperService) { }

  public ngOnDestroy(): void {
    this.imageMsg$.complete();
  }

  public handleLoad(files: IFileObj[]): void {
    this.TabsHelperService.emitImage(!files.length ? null : files[0]);
  }

}
