import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSupplyDetailComponent } from './request-supply-detail.component';

describe('RequestSupplyDetailComponent', () => {
  let component: RequestSupplyDetailComponent;
  let fixture: ComponentFixture<RequestSupplyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSupplyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSupplyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
