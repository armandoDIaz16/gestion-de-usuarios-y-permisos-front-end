import { TestBed } from '@angular/core/testing';

import { RespuestasEncuestaService } from './respuestas-encuesta.service';

describe('RespuestasEncuestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespuestasEncuestaService = TestBed.get(RespuestasEncuestaService);
    expect(service).toBeTruthy();
  });
});
