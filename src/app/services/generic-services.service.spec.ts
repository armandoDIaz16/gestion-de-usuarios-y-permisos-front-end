import { TestBed } from '@angular/core/testing';

import { GenericServicesService } from './generic-services.service';

describe('GenericServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericServicesService = TestBed.get(GenericServicesService);
    expect(service).toBeTruthy();
  });
});
