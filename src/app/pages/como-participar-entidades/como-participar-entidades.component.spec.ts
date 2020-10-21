import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoParticiparEntidadesComponent } from './como-participar-entidades.component';

describe('ComoParticiparEntidadesComponent', () => {
  let component: ComoParticiparEntidadesComponent;
  let fixture: ComponentFixture<ComoParticiparEntidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComoParticiparEntidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoParticiparEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
