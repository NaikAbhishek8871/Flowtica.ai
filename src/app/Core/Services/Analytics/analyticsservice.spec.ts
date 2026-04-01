import { TestBed } from '@angular/core/testing';

import { Analyticsservice } from './analyticsservice';

describe('Analyticsservice', () => {
  let service: Analyticsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Analyticsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
