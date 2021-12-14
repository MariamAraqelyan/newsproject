import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostHelperService {
  private commentsIncreaseSubject = new Subject();
  private commentsIncrease$ = this.commentsIncreaseSubject.asObservable();

  public emitCommentsIncrease(): void {
    this.commentsIncreaseSubject.next();
  }

  public observeCommentsIncrease(): Observable<any> {
    return this.commentsIncrease$;
  }
}
