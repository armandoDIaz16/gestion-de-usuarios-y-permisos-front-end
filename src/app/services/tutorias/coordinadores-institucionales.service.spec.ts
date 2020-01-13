import { TestBed } from '@angular/core/testing';

import { CoordinadoresInstitucionalesService } from './coordinadores-institucionales.service';

describe('CoordinadoresInstitucionalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoordinadoresInstitucionalesService = TestBed.get(CoordinadoresInstitucionalesService);
    expect(service).toBeTruthy();
  });
});
