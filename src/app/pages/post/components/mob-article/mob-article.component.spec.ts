import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobArticleComponent } from './mob-article.component';

describe('MobArticleComponent', () => {
  let component: MobArticleComponent;
  let fixture: ComponentFixture<MobArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
