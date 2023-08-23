import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryIndexComponent } from './product-category-index.component';

describe('ProductCategoryIndexComponent', () => {
  let component: ProductCategoryIndexComponent;
  let fixture: ComponentFixture<ProductCategoryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
