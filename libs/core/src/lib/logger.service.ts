import { Injectable, inject } from "@angular/core";
import { ConfigurationService } from "@lib/shared";

export class ContextualLogger {
    constructor(
        private readonly context: string,
        private readonly isProduction: boolean,
    ) {}

    debug(message: string, ...args: unknown[]): void {
        if (!this.isProduction) {
            console.log(`[DEBUG] [${this.context}]: ${message}`, ...args);
        }
    }

    error(message: string, ...args: unknown[]): void {
        console.error(`[ERROR] [${this.context}]: ${message}`, ...args);
    }

    warn(message: string, ...args: unknown[]): void {
        console.warn(`[WARN] [${this.context}]: ${message}`, ...args);
    }
}

@Injectable({
    providedIn: "root",
})
export class Logger {
    private readonly config = inject(ConfigurationService, { optional: true });

    forContext(context: string): ContextualLogger {
        const isProd = this.config ? this.config.isProduction() : false;
        return new ContextualLogger(context, isProd);
    }
}
