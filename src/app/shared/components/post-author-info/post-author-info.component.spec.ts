import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAuthorInfoComponent } from './post-author-info.component';

describe('PostAuthorInfoComponent', () => {
  let component: PostAuthorInfoComponent;
  let fixture: ComponentFixture<PostAuthorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAuthorInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAuthorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
