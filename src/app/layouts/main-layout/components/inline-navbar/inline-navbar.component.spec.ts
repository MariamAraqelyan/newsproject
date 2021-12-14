import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineNavbarComponent } from './inline-navbar.component';

describe('InlineNavbarComponent', () => {
  let component: InlineNavbarComponent;
  let fixture: ComponentFixture<InlineNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
