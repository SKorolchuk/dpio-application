import { Injectable, inject, computed, Signal } from "@angular/core";
import { ENV_CONFIG_TOKEN } from "@lib/shared";

@Injectable({
    providedIn: "root",
})
export class SettingsService {
    private readonly appEnvironment = inject(ENV_CONFIG_TOKEN);

    readonly version: Signal<string> = computed(() => this.appEnvironment.version);
}
