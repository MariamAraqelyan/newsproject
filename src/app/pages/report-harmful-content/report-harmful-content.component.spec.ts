import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHarmfulContentComponent } from './report-harmful-content.component';

describe('ReportHarmfulContentComponent', () => {
  let component: ReportHarmfulContentComponent;
  let fixture: ComponentFixture<ReportHarmfulContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHarmfulContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHarmfulContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
