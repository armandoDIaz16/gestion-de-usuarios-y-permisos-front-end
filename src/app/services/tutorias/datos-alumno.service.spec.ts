import { TestBed } from '@angular/core/testing';

import { DatosAlumnoService } from './datos-alumno.service';

describe('DatosAlumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosAlumnoService = TestBed.get(DatosAlumnoService);
    expect(service).toBeTruthy();
  });
});
