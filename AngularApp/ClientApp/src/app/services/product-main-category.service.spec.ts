import { TestBed } from '@angular/core/testing';

import { ProductMainCategoryService } from './product-main-category.service';

describe('ProductMainCategoryService', () => {
  let service: ProductMainCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMainCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
