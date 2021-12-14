import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LayoutScrollService } from 'src/app/shared/services/layout-scroll';
import { ConfigService } from 'src/app/shared/services/config';
import { CATEGORIES } from './main-layout.constants';
import { BehaviorSubject, fromEvent, ReplaySubject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'newsreel-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public categories = CATEGORIES;
  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public isMainDisplay$ = new BehaviorSubject(true);

  @ViewChild('main') private mainWrapper: ElementRef<HTMLElement>;
  private destroy$ = new ReplaySubject(1);

  constructor(
    private router: Router,
    private ConfigService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private LayoutScrollService: LayoutScrollService
  ) { }

  public ngOnInit(): void {
    const data = this.activatedRoute.firstChild.snapshot.data;
    this.isMainDisplay$.next(!!data?.isMainDisplay);

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => route.firstChild.snapshot.data),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.isMainDisplay$.next(!!data?.isMainDisplay);
    });
  }

  public ngAfterViewInit(): void {
    this.setScrollListener();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public handleBack(): void {
    this.router.navigate(['/']);
  }

  private setScrollListener(): void {
    const element = this.mainWrapper.nativeElement;

    fromEvent(element, 'scroll').pipe(
      debounceTime(50),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const scrollLimit = 200;
      const scrolledValue = element.scrollHeight - element.offsetHeight - element.scrollTop;
      const isEnoughScrolled = scrolledValue <= scrollLimit;

      this.LayoutScrollService.emitScrollChange(scrolledValue);

      if (isEnoughScrolled) {
        this.LayoutScrollService.emitScrollEnd();
      }
    });
  }

}
