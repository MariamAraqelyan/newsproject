import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/services/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'newsreel-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WriteReviewComponent implements OnInit {
  public user$: Observable<IUser>;
  private id: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.user$ = this.activatedRoute.data.pipe(
      map((data: { user: IUser }) => {
        this.id = data.user.id;

        return data.user
      })
    );
  }

  public handleCancel(): void {
    this.router.navigate(['profile', this.id]);
  }

}
