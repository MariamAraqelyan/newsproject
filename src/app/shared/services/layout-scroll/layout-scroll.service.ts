import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutScrollService {
  private scrollEndSubject = new Subject();
  private scrollEnd$ = this.scrollEndSubject.asObservable();

  private scrollChangeSubject = new Subject<number>();
  private scrollChange$ = this.scrollChangeSubject.asObservable();

  public emitScrollEnd(): void {
    this.scrollEndSubject.next(true);
  }

  public observeScrollEnd(): Observable<any> {
    return this.scrollEnd$;
  }

  public emitScrollChange(value: number): void {
    this.scrollChangeSubject.next(value);
  }

  public observeScrollChange(): Observable<any> {
    return this.scrollChange$;
  }
}
