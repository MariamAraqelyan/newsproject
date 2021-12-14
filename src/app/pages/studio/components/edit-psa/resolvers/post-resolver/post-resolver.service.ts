import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IGeneralPost, PostsService } from 'src/app/shared/services/posts';
import { SnackbarService } from 'src/app/shared/services/snackbar';
import { of, Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostResolverService implements Resolve<IGeneralPost> {

  constructor(
    private PostsService: PostsService,
    private SnackbarService: SnackbarService,
    private router: Router
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGeneralPost> {
    const post: IGeneralPost = this.router.getCurrentNavigation()?.extras?.state?.post;
    const SLUG = route.paramMap.get('slug');

    if (post) {
      return of(post);
    }

    return this.PostsService.getPostBySlug(SLUG).pipe(
      catchError((err) => {
        this.SnackbarService.error('Failed to get a PSA!');
        this.router.navigate(['/']);

        return throwError(err);
      }),
      take(1)
    );
  }
}
