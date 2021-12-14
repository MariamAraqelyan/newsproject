import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { getFirstChildRouteSnapshot } from 'src/app/shared/utils/router';
import { ConfigService } from 'src/app/shared/services/config';
import { TabsHelperService } from './services/tabs-helper';
import { CATEGORIES } from './studio.constants';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'newsreel-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudioComponent implements OnInit, OnDestroy {
  public categories = CATEGORIES;
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public initialSelectedTab$: Observable<number>;
  public showAdditionalTab$ = new ReplaySubject(1);
  public showImageUpload$ = new ReplaySubject(1);

  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private ConfigService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private TabsHelperService: TabsHelperService
  ) { }

  public ngOnInit(): void {
    const data = getFirstChildRouteSnapshot(this.activatedRoute).data;
    this.initialSelectedTab$ = this.TabsHelperService.observeInitialSelectedTab();
    this.handleRouteChange(data);
    this.listenRoutes();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.showImageUpload$.complete();
    this.showAdditionalTab$.complete();
  }

  public emitUploadTabChange(tab: 'image' | 'video' = 'image'): void {
    this.TabsHelperService.emitUploadTabChange(tab);
  }

  private listenRoutes(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => getFirstChildRouteSnapshot(route).data),
      takeUntil(this.destroy$)
    ).subscribe((data) => this.handleRouteChange(data));
  }

  private handleRouteChange(data: { [key: string]: any}): void {
    const { showAdditionalTab, showImageUpload } = data;
    this.showAdditionalTab$.next(!!showAdditionalTab);
    this.showImageUpload$.next(!!showImageUpload);
  }

}
