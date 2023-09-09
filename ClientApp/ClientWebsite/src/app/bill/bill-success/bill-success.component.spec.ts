import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSuccessComponent } from './bill-success.component';

describe('BillSuccessComponent', () => {
  let component: BillSuccessComponent;
  let fixture: ComponentFixture<BillSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillSuccessComponent]
    });
    fixture = TestBed.createComponent(BillSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
