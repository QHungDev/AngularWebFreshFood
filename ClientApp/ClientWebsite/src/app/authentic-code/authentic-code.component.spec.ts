import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticCodeComponent } from './authentic-code.component';

describe('AuthenticCodeComponent', () => {
  let component: AuthenticCodeComponent;
  let fixture: ComponentFixture<AuthenticCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticCodeComponent]
    });
    fixture = TestBed.createComponent(AuthenticCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
