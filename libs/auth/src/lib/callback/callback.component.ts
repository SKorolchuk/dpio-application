import { Component, OnInit, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import * as AuthActions from "../actions/authorize.actions";
import { LoaderComponent } from "@lib/shared";
import { Logger } from "@lib/core/logger";

@Component({
    selector: "app-callback",
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterLink, LoaderComponent],
    templateUrl: "./callback.component.html",
    styleUrls: ["./callback.component.scss"],
})
export class CallbackComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly log = inject(Logger).forContext("CallbackComponent");

    readonly hasError = signal<boolean>(false);
    readonly errorMessage = signal<string | null>(null);

    ngOnInit(): void {
        this.log.debug("OAuth callback handshake detected. Initializing session verification...");
        this.executeAuthHandshake();
    }

    private executeAuthHandshake(): void {
        try {
            this.store.dispatch(AuthActions.loginComplete());

            setTimeout(() => {
                if (!this.hasError()) {
                    this.log.warn("Callback synchronization handshake timed out. Triggering fallback error layout.");
                    this.handleHandshakeFailure("Authentication server handshake timed out. Please try again.");
                }
            }, 10000); // 10 seconds execution limit checkpoint
        } catch (error) {
            this.log.error("Fatal error dispatching authentication completeness handshake:", error);
            this.handleHandshakeFailure(
                "An unexpected error occurred while processing your secure credentials tokens.",
            );
        }
    }

    private handleHandshakeFailure(message: string): void {
        this.hasError.set(true);
        this.errorMessage.set(message);
    }
}
