import { TestBed } from '@angular/core/testing';

import { ResponderEncuestaService } from './responder-encuesta.service';

describe('ResponderEncuestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponderEncuestaService = TestBed.get(ResponderEncuestaService);
    expect(service).toBeTruthy();
  });
});
