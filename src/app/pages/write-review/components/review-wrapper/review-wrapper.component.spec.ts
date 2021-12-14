import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWrapperComponent } from './review-wrapper.component';

describe('ReviewWrapperComponent', () => {
  let component: ReviewWrapperComponent;
  let fixture: ComponentFixture<ReviewWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
