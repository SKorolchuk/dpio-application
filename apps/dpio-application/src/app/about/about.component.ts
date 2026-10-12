import { Component, inject, computed, Signal, ANIMATION_MODULE_TYPE } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { SettingsService } from "@lib/core";

@Component({
    selector: "app-about",
    standalone: true,
    imports: [MatCardModule, MatIconModule],
    providers: [{ provide: ANIMATION_MODULE_TYPE, useValue: "NoopAnimations" }],
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
    private readonly settingsService = inject(SettingsService);

    readonly version: Signal<string> = computed(() => this.settingsService.version());
}
