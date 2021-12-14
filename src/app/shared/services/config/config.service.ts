import { Injectable } from '@angular/core';
import { IConfig } from './config.interface';
import {Subject} from 'rxjs';

declare const __CONFIG__: IConfig;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public isMobile: boolean;
  public isDesktop: boolean;
  public config: IConfig = __CONFIG__;

  public filterData = new Subject();


  constructor() {
    this.detectScreenSize();
  }

  private detectScreenSize(): void {
    const isDesktopSize = window.screen.availWidth >= 1440;
    this.isDesktop = isDesktopSize;
    this.isMobile = !isDesktopSize;
  }
}
