import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSupplyApproveIndexComponent } from './request-supply-approve-index.component';

describe('RequestSupplyApproveIndexComponent', () => {
  let component: RequestSupplyApproveIndexComponent;
  let fixture: ComponentFixture<RequestSupplyApproveIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSupplyApproveIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSupplyApproveIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
