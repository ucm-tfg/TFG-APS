import { TestBed } from '@angular/core/testing';

import { IniciativaService } from './iniciativa.service';

xdescribe('IniciativaService', () => {
  let service: IniciativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
