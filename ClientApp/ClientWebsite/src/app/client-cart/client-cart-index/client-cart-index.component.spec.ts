import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCartIndexComponent } from './client-cart-index.component';

describe('ClientCartIndexComponent', () => {
  let component: ClientCartIndexComponent;
  let fixture: ComponentFixture<ClientCartIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCartIndexComponent]
    });
    fixture = TestBed.createComponent(ClientCartIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
