import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'newsreel-post-header-info',
  templateUrl: './post-header-info.component.html',
  styleUrls: ['./post-header-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostHeaderInfoComponent {
  @Input() public text: string;
  @Input() public createdAt: string;
  @Input() public iconUrl = 'assets/svg/comments.svg';
}
