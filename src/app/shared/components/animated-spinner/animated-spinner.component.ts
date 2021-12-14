import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'newsreel-animated-spinner',
  templateUrl: './animated-spinner.component.html',
  styleUrls: ['./animated-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedSpinnerComponent {
  @Input() public showSpinner = false;
  public items = Array.from({ length: 12 }, (v, i) => i);
}
