import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativaRespaldadaComponent } from './iniciativa-respaldada.component';

describe('IniciativaRespaldadaComponent', () => {
  let component: IniciativaRespaldadaComponent;
  let fixture: ComponentFixture<IniciativaRespaldadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciativaRespaldadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciativaRespaldadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
