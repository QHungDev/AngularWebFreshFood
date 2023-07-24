import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcNavigationComponent } from './vc-navigation.component';

describe('VcNavigationComponent', () => {
  let component: VcNavigationComponent;
  let fixture: ComponentFixture<VcNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
