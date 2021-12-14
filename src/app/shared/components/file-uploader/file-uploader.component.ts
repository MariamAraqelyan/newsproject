import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SIZE_FORMATS } from './file-uploader.constants';
import { IFileObj } from './file-uploader.interface';
import { BehaviorSubject, Observable, zip } from 'rxjs';

@Component({
  selector: 'newsreel-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {
  @Input() public title = '';
  @Input() public imageUrl = '';
  @Input() public size = '100px';
  @Input() public icon = 'camera_alt';
  @Input() public multiple = false;
  @Input() public acceptedTypes = 'image/png, image/jpeg';
  @Output() public loaded = new EventEmitter<IFileObj[]>();

  public ID = `ID-${Math.random()}`;
  public files$: BehaviorSubject<IFileObj[]> = new BehaviorSubject([]);

  public handleDrop(event: DragEvent): void {
    this.processFiles(event.dataTransfer.files);
    event.preventDefault();
  }

  public removeFile(name: string): void {
    const files = this.files$.value.filter((file) => file.name !== name);
    this.files$.next(files);
    this.loaded.emit(files);
  }

  public processFiles(files: FileList): void {
    const observables: Observable<IFileObj>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const isInvalidIndex = !this.multiple && i;
      const isValidType = file.type && this.acceptedTypes.includes(file.type);

      if (isInvalidIndex || !isValidType) {
        continue;
      }

      observables.push(this.createFileObjectObserver(file));
    }

    const sub = zip(...observables).subscribe((data) => {
      this.files$.next(data);
      this.loaded.emit(data);
      sub.unsubscribe();
    });
  }

  private createFileObjectObserver(file: File): Observable<IFileObj> {
    return new Observable<IFileObj>((subscriber) => {
      const isImage = file.type.startsWith('image');
      const reader = new FileReader();
      const fileObj: IFileObj = {
        file,
        name: file.name,
        type: file.type,
        size: this.getFileSize(file),
        lastModified: file.lastModified,
        imageUrl: null
      };

      if (isImage) {
        reader.onloadend = () => {
          fileObj.imageUrl = reader.result as string;
          subscriber.next(fileObj);
          subscriber.complete();
        };

        return reader.readAsDataURL(file);
      }

      subscriber.next(fileObj);
      subscriber.complete();
    });
  }

  private getFileSize(file: File, step = 0): string {
    const sizeFormat = SIZE_FORMATS[step];
    const dividedSize = file.size / 1000 ** step;
    const isRecursionNeeded = dividedSize > 1000 && SIZE_FORMATS[step + 1];

    return isRecursionNeeded ? this.getFileSize(file, step + 1) : dividedSize.toFixed(1) + sizeFormat;
  }
}
