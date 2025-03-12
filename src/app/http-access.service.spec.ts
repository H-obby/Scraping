import { TestBed } from '@angular/core/testing';

import { HttpAccessService } from './http-access.service';

describe('HttpAccessService', () => {
  let service: HttpAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
