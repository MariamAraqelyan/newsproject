import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepostComponent } from './create-repost.component';

describe('CreateRepostComponent', () => {
  let component: CreateRepostComponent;
  let fixture: ComponentFixture<CreateRepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRepostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
