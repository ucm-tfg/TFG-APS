import { TestBed } from '@angular/core/testing';

import { IniciativaCrearGuard } from './iniciativa-crear.guard';

xdescribe('IniciativaCrearGuard', () => {
  let guard: IniciativaCrearGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IniciativaCrearGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
