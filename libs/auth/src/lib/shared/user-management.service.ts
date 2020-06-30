import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConfigurationService } from "@dpio-application/shared/src/lib/services/configuration.service";
import { Api } from "apps/dpio-application/src/environments/api.model";
import { UserRegistration, UserPasswordReset } from "./user.management.interface";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class UserManagementService {
    private _loginUrl = "/user/login";

    constructor(private http: HttpClient, private configuration: ConfigurationService) {}

    get loginUrl(): string {
        return this._loginUrl;
    }
    register(model: UserRegistration): Observable<any> {
        return this.http.post<any>(Api.Register(this.configuration.authEndpoint), model).pipe(
            map((response) => {
                console.log(response);
                return response;
            }),
        );
    }

    resetPassword(model: UserPasswordReset): Observable<any> {
        return this.http.post<any>(Api.ResetPassword(this.configuration.authEndpoint), model).pipe(
            map((response) => {
                console.log(response);
                return response;
            }),
        );
    }
}
