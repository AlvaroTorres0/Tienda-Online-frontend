import { TestBed } from '@angular/core/testing';

import { DipomexServiceService } from './dipomex-service.service';

describe('DipomexServiceService', () => {
  let service: DipomexServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DipomexServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
