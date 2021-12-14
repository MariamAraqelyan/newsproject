import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepostTabComponent } from './repost-tab.component';

describe('RepostTabComponent', () => {
  let component: RepostTabComponent;
  let fixture: ComponentFixture<RepostTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepostTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepostTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
