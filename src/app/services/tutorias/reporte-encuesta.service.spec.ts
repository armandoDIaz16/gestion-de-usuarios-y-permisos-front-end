import { TestBed } from '@angular/core/testing';

import { ReporteEncuestaService } from './reporte-encuesta.service';

describe('ReporteEncuestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteEncuestaService = TestBed.get(ReporteEncuestaService);
    expect(service).toBeTruthy();
  });
});
