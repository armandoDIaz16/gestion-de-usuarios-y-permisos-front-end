import { TestBed } from '@angular/core/testing';

import { VerEncuestasService } from './ver-encuestas.service';

describe('VerEncuestasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerEncuestasService = TestBed.get(VerEncuestasService);
    expect(service).toBeTruthy();
  });
});
