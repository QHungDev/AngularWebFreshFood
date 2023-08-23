import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcFooterComponent } from './vc-footer.component';

describe('VcFooterComponent', () => {
  let component: VcFooterComponent;
  let fixture: ComponentFixture<VcFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcFooterComponent]
    });
    fixture = TestBed.createComponent(VcFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
