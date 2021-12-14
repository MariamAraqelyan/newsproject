import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBtnComponent } from './report-btn.component';

describe('ReportBtnComponent', () => {
  let component: ReportBtnComponent;
  let fixture: ComponentFixture<ReportBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
