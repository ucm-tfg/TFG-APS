import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenariadosVerComponent } from './partenariados-ver.component';

xdescribe('PartenariadosVerComponent', () => {
  let component: PartenariadosVerComponent;
  let fixture: ComponentFixture<PartenariadosVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartenariadosVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenariadosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
