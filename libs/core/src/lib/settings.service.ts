import { Injectable } from "@angular/core";
import { environment } from "apps/dpio-application/src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class SettingsService {
    constructor() {}

    get version(): string {
        return environment.version;
    }
}
