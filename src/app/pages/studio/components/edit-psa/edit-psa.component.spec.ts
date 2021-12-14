import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPsaComponent } from './edit-psa.component';

describe('EditPsaComponent', () => {
  let component: EditPsaComponent;
  let fixture: ComponentFixture<EditPsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
