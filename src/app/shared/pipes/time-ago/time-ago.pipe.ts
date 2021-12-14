import { Pipe, PipeTransform } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  public transform(value: number | string, ...args: unknown[]): Observable<string> {
    return timer(0, 1000 * 60).pipe(
      map(() => {
        const date = moment(+value);

        return date.isValid() ? date.fromNow() : '';
      })
    );
  }

}
