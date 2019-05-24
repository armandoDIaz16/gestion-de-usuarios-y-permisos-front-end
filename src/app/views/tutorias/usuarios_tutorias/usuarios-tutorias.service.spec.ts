import { TestBed } from '@angular/core/testing';

import { UsuariosTutoriasService } from './usuarios-tutorias.service';

describe('UsuariosTutoriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosTutoriasService = TestBed.get(UsuariosTutoriasService);
    expect(service).toBeTruthy();
  });
});
