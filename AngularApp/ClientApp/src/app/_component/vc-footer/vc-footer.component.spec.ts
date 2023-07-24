import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcFooterComponent } from './vc-footer.component';

describe('VcFooterComponent', () => {
  let component: VcFooterComponent;
  let fixture: ComponentFixture<VcFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
