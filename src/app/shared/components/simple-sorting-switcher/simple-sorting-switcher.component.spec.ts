import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSortingSwitcherComponent } from './simple-sorting-switcher.component';

describe('SimpleSortingSwitcherComponent', () => {
  let component: SimpleSortingSwitcherComponent;
  let fixture: ComponentFixture<SimpleSortingSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleSortingSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSortingSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
