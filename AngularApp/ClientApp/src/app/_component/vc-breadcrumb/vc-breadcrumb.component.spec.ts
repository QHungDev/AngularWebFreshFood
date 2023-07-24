import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcBreadcrumbComponent } from './vc-breadcrumb.component';

describe('VcBreadcrumbComponent', () => {
  let component: VcBreadcrumbComponent;
  let fixture: ComponentFixture<VcBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
