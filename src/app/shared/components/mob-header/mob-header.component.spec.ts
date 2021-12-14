import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobHeaderComponent } from './mob-header.component';

describe('MobHeaderComponent', () => {
  let component: MobHeaderComponent;
  let fixture: ComponentFixture<MobHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
