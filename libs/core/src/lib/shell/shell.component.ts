import { Component, OnInit, inject, computed, Signal } from "@angular/core";
import { Router, RouterOutlet, RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AuthenticationService } from "@lib/auth";
import { I18nService } from "../i18n.service";
import { LangSelectorComponent } from "../lang-selector/lang-selector.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: "app-shell",
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        LangSelectorComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatDividerModule,
    ],
    templateUrl: "./shell.component.html",
    styleUrls: ["./shell.component.scss"],
})
export class ShellComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly titleService = inject(Title);
    private readonly authenticationService = inject(AuthenticationService);
    private readonly i18nService = inject(I18nService);

    readonly username: Signal<string | null> = computed(() => {
        const credentials = this.authenticationService.credentials();
        return credentials ? credentials.username : null;
    });

    readonly languages: Signal<readonly string[]> = computed(() => this.i18nService.supportedLanguages());

    readonly currentLanguage: Signal<string> = computed(() => this.i18nService.currentLanguage());

    readonly title: Signal<string> = computed(() => this.titleService.getTitle());

    readonly isMobile: Signal<boolean> = computed(() => true);

    ngOnInit(): void {
        this.i18nService.init();
    }

    setLanguage(language: string): void {
        this.i18nService.setLanguage(language);
    }

    async logout(): Promise<void> {
        await this.authenticationService.logout();
        await this.router.navigate(["/user/login"], { replaceUrl: true });
    }
}
