import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSubscribeComponent } from './newsletter-subscribe.component';

xdescribe('NewsletterSubscribeComponent', () => {
  let component: NewsletterSubscribeComponent;
  let fixture: ComponentFixture<NewsletterSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
