import { TestBed } from '@angular/core/testing';

import { TabsHelperService } from './tabs-helper.service';

describe('TabsHelperService', () => {
  let service: TabsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
