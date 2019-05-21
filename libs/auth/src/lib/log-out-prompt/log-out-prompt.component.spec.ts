import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutPromptComponent } from './log-out-prompt.component';

describe('LogOutPromptComponent', () => {
  let component: LogOutPromptComponent;
  let fixture: ComponentFixture<LogOutPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogOutPromptComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
