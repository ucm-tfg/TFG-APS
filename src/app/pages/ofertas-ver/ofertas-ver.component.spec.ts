import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasVerComponent } from './ofertas-ver.component';

xdescribe('OfertasVerComponent', () => {
  let component: OfertasVerComponent;
  let fixture: ComponentFixture<OfertasVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertasVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertasVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
