import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationService } from '../../../../auth/src/lib/shared/authentication.service';
import { MockAuthenticationService } from '../../../../auth/src/lib/shared/authentication.service.mock';
import { ShellComponent } from './shell.component';
import { CoreModule } from '../core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot(), BrowserAnimationsModule, CoreModule],
      providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
