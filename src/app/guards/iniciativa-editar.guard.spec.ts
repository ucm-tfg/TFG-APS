import { TestBed } from '@angular/core/testing';

import { IniciativaEditarGuard } from './iniciativa-editar.guard';

xdescribe('IniciativaEditarGuard', () => {
  let guard: IniciativaEditarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IniciativaEditarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
