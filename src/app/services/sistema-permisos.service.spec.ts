import { TestBed } from '@angular/core/testing';

import { SistemaPermisosService } from './sistema-permisos.service';

describe('SistemaPermisosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SistemaPermisosService = TestBed.get(SistemaPermisosService);
    expect(service).toBeTruthy();
  });
});
