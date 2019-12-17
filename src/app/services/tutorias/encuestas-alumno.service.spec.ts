import { TestBed } from '@angular/core/testing';

import { EncuestasAlumnoService } from './encuestas-alumno.service';

describe('EncuestasAlumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncuestasAlumnoService = TestBed.get(EncuestasAlumnoService);
    expect(service).toBeTruthy();
  });
});
