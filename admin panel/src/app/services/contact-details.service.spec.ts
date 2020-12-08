import { TestBed } from '@angular/core/testing';

import { ContactDetailsService } from './contact-details.service';

describe('ContactDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactDetailsService = TestBed.get(ContactDetailsService);
    expect(service).toBeTruthy();
  });
});
