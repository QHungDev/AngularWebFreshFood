import { TestBed } from '@angular/core/testing';

import { AuthencationGuard } from './authencation.guard';

describe('AuthencationGuard', () => {
  let guard: AuthencationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthencationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
