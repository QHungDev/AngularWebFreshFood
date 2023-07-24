import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcAdminSettingComponent } from './vc-admin-setting.component';

describe('VcAdminSettingComponent', () => {
  let component: VcAdminSettingComponent;
  let fixture: ComponentFixture<VcAdminSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcAdminSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcAdminSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
