import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

@Injectable({
    providedIn: "root",
})
export class SettingsService {
    constructor() {}

    get version(): string {
        return environment.version;
    }
}
