import { Credentials } from "./authentication.service";
import { Observable, of } from "rxjs";
import { ILogin } from "./credentials.interface";

export class MockAuthenticationService {
    credentials: Credentials = {
        username: "test",
        token: "123",
        password: "123",
    };

    login(context: ILogin): Observable<Credentials> {
        return of({
            username: context.email,
            password: context.password,
            token: "123456",
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
