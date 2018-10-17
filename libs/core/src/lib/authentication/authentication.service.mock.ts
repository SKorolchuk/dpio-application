import { Credentials, LoginContext } from './authentication.service';
import { Observable, of } from 'rxjs';

export class MockAuthenticationService {
    credentials: Credentials = {
        username: 'test',
        token: '123'
    };

    login(context: LoginContext): Observable<Credentials> {
        return of({
            username: context.username,
            token: '123456'
        });
    }

    logout(): Observable<boolean> {
        this.credentials = null;
        return of(true);
    }

    isAuthenticated(): boolean {
        return !!this.credentials;
    }
}
