import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcHeaderComponent } from './vc-header.component';

describe('VcHeaderComponent', () => {
  let component: VcHeaderComponent;
  let fixture: ComponentFixture<VcHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcHeaderComponent]
    });
    fixture = TestBed.createComponent(VcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
