import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneConfirmComponent } from './phone-confirm.component';

describe('PhoneConfirmComponent', () => {
  let component: PhoneConfirmComponent;
  let fixture: ComponentFixture<PhoneConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
