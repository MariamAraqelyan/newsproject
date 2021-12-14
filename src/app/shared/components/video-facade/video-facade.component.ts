import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'newsreel-video-facade',
  templateUrl: './video-facade.component.html',
  styleUrls: ['./video-facade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoFacadeComponent implements OnChanges {
  public playBtnUrl: string;

  @Input() public image: string;
  @Input() private isYoutube = true;

  public ngOnChanges(): void {
    this.playBtnUrl = `assets/svg/${this.isYoutube ? 'youtube' : 'vimeo'}-logo.svg`;
  }

}
