import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFacadeComponent } from './video-facade.component';

describe('VideoFacadeComponent', () => {
  let component: VideoFacadeComponent;
  let fixture: ComponentFixture<VideoFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFacadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
