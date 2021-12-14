import { Injectable } from '@angular/core';
import { UserService } from 'src/app/shared/services/user';
import { IOneSignal } from './one-signal.interface';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {
  private isLoaded = false;
  private signal: IOneSignal;
  private initialSignal: IOneSignal;

  constructor(
    private UserService: UserService
  ) {
    window['OneSignal'] = window['OneSignal'] || [];
    this.initialSignal = window['OneSignal'];
  }

  public loadSignal(): void {
    if (this.isLoaded) {
      return;
    }

    const anchor = document.getElementsByTagName('script')[0];
    const parent = anchor.parentElement;
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
    parent.insertBefore(script, anchor);
    this.isLoaded = true;
  }

  public initSignal(): void {
    if (!this.isLoaded) {
      this.loadSignal();
    }

    this.initialSignal.push(() => {
      this.signal = window['OneSignal'];
      this.signal.init({
        appId: '53e503c1-e9ca-4889-a5e2-740aae5fad1a',
        safari_web_id: 'web.onesignal.auto.3c5e9739-5d2f-4f69-94b2-78aed3043174',
        notifyButton: { enable: true }
      });

      this.signal.showNativePrompt();
      this.handleSubscription();
    });
  }

  public unsubscribe(): void {
    this.signal.removeExternalUserId();
  }

  private handleSubscription(): void {
    this.signal.isPushNotificationsEnabled((isEnabled) => {
      if (isEnabled) {
        const id = this.UserService.getCurrentUserId();
        this.signal.setExternalUserId(id);
      }
    });
  }
}
