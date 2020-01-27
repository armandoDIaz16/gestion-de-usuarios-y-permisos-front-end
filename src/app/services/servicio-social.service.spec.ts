import { TestBed } from '@angular/core/testing';

import { ServicioSocialService } from './servicio-social.service';

describe('ServicioSocialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioSocialService = TestBed.get(ServicioSocialService);
    expect(service).toBeTruthy();
  });
});
