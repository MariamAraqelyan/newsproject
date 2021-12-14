import { TestBed } from '@angular/core/testing';

import { LayoutScrollService } from './layout-scroll.service';

describe('LayoutScrollService', () => {
  let service: LayoutScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
