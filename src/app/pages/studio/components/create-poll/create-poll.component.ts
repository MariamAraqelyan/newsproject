import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { getMessageFromApiError } from 'src/app/shared/utils/api-error-handling';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { PostsService } from 'src/app/shared/services/posts';
import { UserService } from 'src/app/shared/services/user';
import { CATEGORIES } from './../../studio.constants';
import { BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { IChoice } from './create-poll.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'newsreel-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePollComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public loading$ = new BehaviorSubject(false);
  public list$ = new BehaviorSubject<IChoice[]>([]);
  public pollGroup = this.fb.group({
    category: ['', Validators.required],
    question: ['', Validators.required],
    choices_text: this.fb.array([])
  });

  private destroy$ = new ReplaySubject(1);

  public postTypeList: Array<any> = [
    {
      'name' : 'Poll',
      'href' : 'studio/create/poll'
    },
    {
      'name' : 'Article',
      'href' : 'studio/create/article'
    },
    {
      'name' : 'Meme',
      'href' : 'studio/create/meme'
    },
    {
      'name' : 'Psa',
      'href' : 'studio/psa'
    },
    {
      'name' : 'Repost',
      'href' : 'studio/repost/article'
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserService,
    private PostsService: PostsService,
    private SnackbarService: SnackbarService
  ) { }

  public ngOnInit(): void {
    const list = Array.from({ length: 3 }, (v, i) => {
      const control = new FormControl('', Validators.required);
      const choices = this.pollGroup.controls.choices_text as FormArray;
      choices.push(control);

      return { id: `${Math.random()}`, control };
    });

    this.list$.next(list);
  }

  public changePostType(pageName): void {
    this.router.navigate(['/' + pageName.href]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.loading$.complete();
    this.list$.complete();
  }

  public trackChoices(index: number, choice: IChoice): string {
    return choice.id;
  }

  public addChoice(): void {
    if (this.list$.value.length >= 5) {
      return;
    }

    const list = this.list$.value;
    const control = new FormControl('', Validators.required);
    const choices = this.pollGroup.controls.choices_text as FormArray;
    this.list$.next([...list, { id: `${Math.random()}`, control }]);
    choices.push(control);
  }

  public removeChoice(choice: IChoice): void {
    if (this.list$.value.length <= 2) {
      return;
    }

    const choices = this.pollGroup.controls.choices_text as FormArray;
    const index = choices.controls.findIndex((item) => item === choice.control);
    const list = this.list$.value.filter((item) => item.id !== choice.id);
    choices.removeAt(index);
    this.list$.next(list);
  }

  public submit(): void {
    if (this.pollGroup.invalid || this.loading$.value) {
      return;
    }

    const value = this.pollGroup.value;
    const params = {
      category: value.category,
      question: value.question,
      choices_text: value.choices_text
    };

    this.loading$.next(true);
    this.PostsService.createPoll(params).pipe(
      catchError((err) => {
        const msg = getMessageFromApiError(err, 'Failed to create a poll.');
        this.SnackbarService.error(msg);

        return throwError(err);
      }),
      finalize(() => this.loading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const ID = this.UserService.getCurrentUserId();
      const msg = 'Poll has been successfully created.';
      this.router.navigate(['profile', ID]).then(() => this.SnackbarService.success(msg));
    });
  }

}
