import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePsaComponent } from './create-psa.component';

describe('CreatePsaComponent', () => {
  let component: CreatePsaComponent;
  let fixture: ComponentFixture<CreatePsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
