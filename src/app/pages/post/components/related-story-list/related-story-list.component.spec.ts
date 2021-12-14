import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedStoryListComponent } from './related-story-list.component';

describe('RelatedStoryListComponent', () => {
  let component: RelatedStoryListComponent;
  let fixture: ComponentFixture<RelatedStoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedStoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedStoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
