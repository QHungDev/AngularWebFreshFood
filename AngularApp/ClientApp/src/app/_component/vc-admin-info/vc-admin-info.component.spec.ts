import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcAdminInfoComponent } from './vc-admin-info.component';

describe('VcAdminInfoComponent', () => {
  let component: VcAdminInfoComponent;
  let fixture: ComponentFixture<VcAdminInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcAdminInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcAdminInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
