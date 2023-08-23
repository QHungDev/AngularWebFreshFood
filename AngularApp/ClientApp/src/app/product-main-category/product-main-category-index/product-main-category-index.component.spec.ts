import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainCategoryIndexComponent } from './product-main-category-index.component';

describe('ProductMainCategoryIndexComponent', () => {
  let component: ProductMainCategoryIndexComponent;
  let fixture: ComponentFixture<ProductMainCategoryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMainCategoryIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMainCategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
