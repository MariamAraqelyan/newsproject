import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsModalComponent } from './reviews-modal.component';

describe('ReviewsModalComponent', () => {
  let component: ReviewsModalComponent;
  let fixture: ComponentFixture<ReviewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
