import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCodeInputComponent } from './sms-code-input.component';

describe('SmsCodeInputComponent', () => {
  let component: SmsCodeInputComponent;
  let fixture: ComponentFixture<SmsCodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsCodeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
