import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {getFirstChildRouteSnapshot} from 'src/app/shared/utils/router';
import {OneSignalService} from 'src/app/shared/services/one-signal';
import {AuthService} from 'src/app/shared/services/auth';
import {MetaService} from 'src/app/shared/services/meta';
import {UserService} from 'src/app/shared/services/user';
import {filter, map} from 'rxjs/operators';
import {removeFromStringTags} from 'src/app/shared/utils/form-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private AuthService: AuthService,
    private UserService: UserService,
    private MetaService: MetaService,
    private OneSignalService: OneSignalService
  ) {
  }

  public ngOnInit(): void {
    if (this.AuthService.isLoggedIn()) {
      this.OneSignalService.initSignal();
    }

    this.UserService.fetchUser().subscribe();
    this.AuthService.runTokenRefreshCheck();
    this.trackNavigation();
  }

  private trackNavigation(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => getFirstChildRouteSnapshot(route).data)
    ).subscribe((data) => {
      if (data.post) {
        data.meta.title = data.post.title ? data.post.title : data.post.author.username + 'News | Newsreel';
        data.meta.description = data.post.text ? data.post.text : 'View post from' + data.post.author.username + 'on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people';
        data.meta.url = data.post.title ? window.location.href : window.location.href + '/' + data.post.author.username + '-news-' + data.post.author.id;
      }else if (data.user) {
        data.meta.title = data.user.username + ' | Newsreel';
        data.meta.description = data.user.username + ' is a journalist on the Newsreel platform. View posts from the journalist ' + data.user.username + ' here.';
        data.meta.url = 'Newsreel.io/' + data.user.username;
      }

      data.meta.description = removeFromStringTags(data.meta.description);
      if (data.meta.description.length >= 160) {
        const textValue = data.meta.description.substring(0, 160);
        data.meta.description = textValue.substring(0, textValue.lastIndexOf(' ') + 1) + '...';
      }

      if (data.meta.title.length >= 70) {
        const textValue = data.meta.title.substring(0, 70);
        data.meta.title = textValue.substring(0, textValue.lastIndexOf(' ') + 1) + '...';
      }


      this.MetaService.setMetaData(data.meta);
    });
  }
}
