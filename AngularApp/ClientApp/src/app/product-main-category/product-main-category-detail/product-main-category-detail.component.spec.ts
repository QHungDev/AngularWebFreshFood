import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainCategoryDetailComponent } from './product-main-category-detail.component';

describe('ProductMainCategoryDetailComponent', () => {
  let component: ProductMainCategoryDetailComponent;
  let fixture: ComponentFixture<ProductMainCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMainCategoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMainCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
