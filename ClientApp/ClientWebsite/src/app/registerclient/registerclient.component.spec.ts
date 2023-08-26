import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterclientComponent } from './registerclient.component';

describe('RegisterclientComponent', () => {
  let component: RegisterclientComponent;
  let fixture: ComponentFixture<RegisterclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterclientComponent]
    });
    fixture = TestBed.createComponent(RegisterclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
