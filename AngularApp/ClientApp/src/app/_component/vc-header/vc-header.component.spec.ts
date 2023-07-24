import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcHeaderComponent } from './vc-header.component';

describe('VcHeaderComponent', () => {
  let component: VcHeaderComponent;
  let fixture: ComponentFixture<VcHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
