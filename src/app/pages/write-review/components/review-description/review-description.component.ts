import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/shared/services/config';
import { IUser } from 'src/app/shared/services/user';

@Component({
  selector: 'newsreel-review-description',
  templateUrl: './review-description.component.html',
  styleUrls: ['./review-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewDescriptionComponent {
  @Input() public user: IUser;
  @Output() public setDescription = new EventEmitter();

  public isMobile = this.ConfigService.isMobile;
  public isDesktop = this.ConfigService.isDesktop;
  public reviewData = this.fb.group({
    description: ['', [ Validators.required, Validators.minLength(1) ]]
  });

  constructor(
    private fb: FormBuilder,
    private ConfigService: ConfigService
  ) { }

  public submit(): void {
    if (this.reviewData.valid) {
      this.setDescription.emit(this.reviewData.value.description);
    }
  }
}
