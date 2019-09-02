import { TestBed } from '@angular/core/testing';

import { CanalizacionesAlumnoService } from './canalizaciones-alumno.service';

describe('CanalizacionesAlumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanalizacionesAlumnoService = TestBed.get(CanalizacionesAlumnoService);
    expect(service).toBeTruthy();
  });
});
