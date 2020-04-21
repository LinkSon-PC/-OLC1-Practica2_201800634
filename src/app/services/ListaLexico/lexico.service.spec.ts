import { TestBed } from '@angular/core/testing';

import { LexicoService } from './lexico.service';

describe('LexicoService', () => {
  let service: LexicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LexicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
