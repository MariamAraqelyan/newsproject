import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingOpportunitiesComponent } from './advertising-opportunities.component';

describe('AdvertisingOpportunitiesComponent', () => {
  let component: AdvertisingOpportunitiesComponent;
  let fixture: ComponentFixture<AdvertisingOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
