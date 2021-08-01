import { TestBed } from '@angular/core/testing';

import { AkosCommonService } from './akos-common.service';

describe('AkosCommonService', () => {
  let service: AkosCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AkosCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
