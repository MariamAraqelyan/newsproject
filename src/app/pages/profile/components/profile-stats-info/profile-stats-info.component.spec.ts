import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatsInfoComponent } from './profile-stats-info.component';

describe('ProfileStatsInfoComponent', () => {
  let component: ProfileStatsInfoComponent;
  let fixture: ComponentFixture<ProfileStatsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStatsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStatsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
