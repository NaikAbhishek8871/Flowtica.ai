import { TestBed } from '@angular/core/testing';
import { Biopageservice } from './biopageservice';

describe('Biopageservice', () => {
  let service: Biopageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Biopageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
