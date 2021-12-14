import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SnackbarService} from 'src/app/shared/services/snackbar';
import {ClipboardService} from 'ngx-clipboard';
import {document} from 'ngx-bootstrap/utils';
import {Router} from '@angular/router';
import {ConfigService} from '../../services/config';

@Component({
  selector: 'newsreel-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialShareComponent implements OnInit {
  @Input() public url: string;
  @Input() public postData: any;
  public postUrl: any;

  private shareWidgetUrls = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    twitter: 'https://twitter.com/intent/tweet?url=',
  };

  constructor(private SnackbarService: SnackbarService,
              private clipboardService: ClipboardService,
              private ConfigService: ConfigService,
              private router: Router) {
  }

  ngOnInit() {
    this.postUrl = this.postData ? window.location.host + '/post/' + this.postData['slug'] : window.location.host + this.router.url;
  }

  public shareLink(network: string): void {
    const widget = this.shareWidgetUrls[network];
    if (!this.url && this.router.url.includes('news')) {
      this.url = window.location.host + this.router.url;
    } else if (!this.url && this.router.url.includes('post')) {
      this.url = window.location.host + this.router.url;
    }

    if (!widget || !this.url) {
      return;
    }

    let shareLink = `${widget}${this.url}`;

    if(network === 'facebook') {
      const newUrl = 'https://' + this.url;
       shareLink = `${widget}${newUrl}`;
    }

    const popup = window.open(shareLink, '', `height=570,width=962`);

    if (!popup) {
      this.SnackbarService.error('We couldn\'t open a popup. Please, check if popups are allowed and try again.');
    }
  }

  public copyContent(): void {
    this.clipboardService.copyFromContent(this.postUrl);
  }

  public closeSection(): void {
    document.querySelector('.cdk-overlay-backdrop.cdk-overlay-dark-backdrop.cdk-overlay-backdrop-showing').click();
  }

}
