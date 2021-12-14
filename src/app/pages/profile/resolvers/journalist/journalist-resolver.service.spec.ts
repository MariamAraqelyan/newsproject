import { TestBed } from '@angular/core/testing';

import { JournalistResolverService } from './journalist-resolver.service';

describe('JournalistResolverService', () => {
  let service: JournalistResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalistResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
