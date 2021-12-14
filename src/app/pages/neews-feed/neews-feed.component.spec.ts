import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeewsFeedComponent } from './neews-feed.component';

describe('NeewsFeedComponent', () => {
  let component: NeewsFeedComponent;
  let fixture: ComponentFixture<NeewsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeewsFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
