import { TestBed } from '@angular/core/testing';

import { SubCategoriesService } from './sub-categories.service';

describe('SubCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubCategoriesService = TestBed.get(SubCategoriesService);
    expect(service).toBeTruthy();
  });
});
