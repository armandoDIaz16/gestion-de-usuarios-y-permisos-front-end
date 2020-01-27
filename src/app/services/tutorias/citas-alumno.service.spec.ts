import { TestBed } from '@angular/core/testing';

import { CitasAlumnoService } from './citas-alumno.service';

describe('CitasAlumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitasAlumnoService = TestBed.get(CitasAlumnoService);
    expect(service).toBeTruthy();
  });
});
