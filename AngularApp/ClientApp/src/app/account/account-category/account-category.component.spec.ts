import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCategoryComponent } from './account-category.component';

describe('AccountCategoryComponent', () => {
  let component: AccountCategoryComponent;
  let fixture: ComponentFixture<AccountCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
