import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSupplyIndexComponent } from './request-supply-index.component';

describe('RequestSupplyIndexComponent', () => {
  let component: RequestSupplyIndexComponent;
  let fixture: ComponentFixture<RequestSupplyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSupplyIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSupplyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
