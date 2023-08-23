import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCartDetailComponent } from './client-cart-detail.component';

describe('ClientCartDetailComponent', () => {
  let component: ClientCartDetailComponent;
  let fixture: ComponentFixture<ClientCartDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCartDetailComponent]
    });
    fixture = TestBed.createComponent(ClientCartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
