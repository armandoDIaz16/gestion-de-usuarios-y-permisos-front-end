import { TestBed } from '@angular/core/testing';

import { HorarioAlumnoService } from './horario-alumno.service';

describe('HorarioAlumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorarioAlumnoService = TestBed.get(HorarioAlumnoService);
    expect(service).toBeTruthy();
  });
});
