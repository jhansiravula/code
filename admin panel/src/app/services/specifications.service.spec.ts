import { TestBed } from '@angular/core/testing';

import { SpecificationsService } from './specifications.service';

describe('SpecificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecificationsService = TestBed.get(SpecificationsService);
    expect(service).toBeTruthy();
  });
});
