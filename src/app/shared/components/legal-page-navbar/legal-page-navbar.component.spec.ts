import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPageNavbarComponent } from './legal-page-navbar.component';

describe('LegalPageNavbarComponent', () => {
  let component: LegalPageNavbarComponent;
  let fixture: ComponentFixture<LegalPageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalPageNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalPageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
