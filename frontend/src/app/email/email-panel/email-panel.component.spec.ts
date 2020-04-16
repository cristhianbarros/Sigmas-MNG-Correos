import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPanelComponent } from './email-panel.component';

describe('EmailPanelComponent', () => {
  let component: EmailPanelComponent;
  let fixture: ComponentFixture<EmailPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
