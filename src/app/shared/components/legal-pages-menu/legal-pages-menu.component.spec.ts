import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPagesMenuComponent } from './legal-pages-menu.component';

describe('LegalPagesMenuComponent', () => {
  let component: LegalPagesMenuComponent;
  let fixture: ComponentFixture<LegalPagesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalPagesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalPagesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
