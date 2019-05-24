import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UserManagementEffects } from './user-management.effects';

describe('AuthorizeEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: UserManagementEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get(UserManagementEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
