import { TestBed } from '@angular/core/testing';

import { AreaAcademicaServiceService } from './area-academica-service.service';

describe('AreaAcademicaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaAcademicaServiceService = TestBed.get(AreaAcademicaServiceService);
    expect(service).toBeTruthy();
  });
});
