import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { IFileObj } from 'src/app/shared/components/file-uploader';
import { IVideo } from './tabs-helper.interface';

// TODO: GET RID OF THIS SERVICE
@Injectable({
  providedIn: 'root'
})
export class TabsHelperService {
  private videoSubject = new Subject<IVideo>();
  private video$ = this.videoSubject.asObservable();

  private imageSubject = new Subject<IFileObj | null>();
  private image$ = this.imageSubject.asObservable();

  private uploadTabSubject = new BehaviorSubject<'image' | 'video'>('image');
  private uploadTab$ = this.uploadTabSubject.asObservable();

  private imageUrlSubject = new ReplaySubject<string>(1);
  private imageUrl$ = this.imageUrlSubject.asObservable();

  private videoDataSetSubject = new ReplaySubject<IVideo>(1);
  private videoDataSet$ = this.videoDataSetSubject.asObservable();

  private initialSelectedTabSubject = new ReplaySubject<number>(1);
  private initialSelectedTab$ = this.initialSelectedTabSubject.asObservable();

  public reset(): void {
    this.setimageUrl(null);
    this.setVideoData(null);
    this.setInitialSelectedTab(0);
  }

  // call reset method after usage
  public setInitialSelectedTab(index: number): void {
    this.initialSelectedTabSubject.next(index);
  }

  public observeInitialSelectedTab(): Observable<number> {
    return this.initialSelectedTab$;
  }

  // call reset method after usage
  public setVideoData(data: IVideo): void {
    this.videoDataSetSubject.next(data);
  }

  public observeVideoDataSet(): Observable<IVideo> {
    return this.videoDataSet$;
  }

  // call reset method after usage
  public setimageUrl(url: string): void {
    this.imageUrlSubject.next(url);
  }

  public getImageUrl(): Observable<string> {
    return this.imageUrl$;
  }

  public emitImage(image: IFileObj): void {
    this.imageSubject.next(image);
  }

  public getImageObservable(): Observable<IFileObj | null> {
    return this.image$;
  }

  public emitVideo(video: IVideo): void {
    this.videoSubject.next(video);
  }

  public getVideoObservable(): Observable<IVideo> {
    return this.video$;
  }

  public emitUploadTabChange(tab: 'image' | 'video'): void {
    this.uploadTabSubject.next(tab);
  }

  public observeUploadTabChange(): Observable<'image' | 'video'> {
    return this.uploadTab$;
  }
}
