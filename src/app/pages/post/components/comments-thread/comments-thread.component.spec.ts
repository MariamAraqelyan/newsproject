import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsThreadComponent } from './comments-thread.component';

describe('CommentsThreadComponent', () => {
  let component: CommentsThreadComponent;
  let fixture: ComponentFixture<CommentsThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
