import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeaderInfoComponent } from './post-header-info.component';

describe('PostHeaderInfoComponent', () => {
  let component: PostHeaderInfoComponent;
  let fixture: ComponentFixture<PostHeaderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostHeaderInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
