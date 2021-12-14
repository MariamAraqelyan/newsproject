import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingSetterComponent } from './star-rating-setter.component';

describe('StarRatingSetterComponent', () => {
  let component: StarRatingSetterComponent;
  let fixture: ComponentFixture<StarRatingSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarRatingSetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
