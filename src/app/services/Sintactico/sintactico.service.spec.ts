import { TestBed } from '@angular/core/testing';

import { SintacticoService } from './sintactico.service';

describe('SintacticoService', () => {
  let service: SintacticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SintacticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
