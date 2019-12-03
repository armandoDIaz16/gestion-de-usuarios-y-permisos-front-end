import { TestBed } from '@angular/core/testing';

import { SeguimientoServiceService } from './seguimiento-service.service';

describe('SeguimientoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeguimientoServiceService = TestBed.get(SeguimientoServiceService);
    expect(service).toBeTruthy();
  });
});
