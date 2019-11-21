import { TestBed } from '@angular/core/testing';

import { CoordinadoresDepartamentalesService } from './coordinadores-departamentales.service';

describe('CoordinadoresDepartamentalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoordinadoresDepartamentalesService = TestBed.get(CoordinadoresDepartamentalesService);
    expect(service).toBeTruthy();
  });
});
