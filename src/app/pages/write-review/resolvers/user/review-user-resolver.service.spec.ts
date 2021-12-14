import { TestBed } from '@angular/core/testing';

import { ReviewUserResolverService } from './review-user-resolver.service';

describe('ReviewUserResolverService', () => {
  let service: ReviewUserResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewUserResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
