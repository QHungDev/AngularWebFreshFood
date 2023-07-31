import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIndexComponent } from './product-index.component';

describe('ProductIndexComponent', () => {
  let component: ProductIndexComponent;
  let fixture: ComponentFixture<ProductIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductIndexComponent]
    });
    fixture = TestBed.createComponent(ProductIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
