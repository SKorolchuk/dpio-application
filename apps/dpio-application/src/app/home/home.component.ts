import { Component, OnInit, inject, signal, ANIMATION_MODULE_TYPE } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCardModule } from "@angular/material/card";
import { finalize } from "rxjs/operators";

import { QuoteService } from "./quote.service";
import { LoaderComponent } from "@lib/shared";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [MatCardModule, LoaderComponent],
    providers: [{ provide: ANIMATION_MODULE_TYPE, useValue: "NoopAnimations" }],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
    private readonly quoteService = inject(QuoteService);

    readonly quote = signal<string | null>(null);
    readonly isLoading = signal<boolean>(false);

    private readonly jokeStream$ = this.quoteService.getRandomQuote({ category: "dev" }).pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(),
    );

    ngOnInit(): void {
        if (typeof window === "undefined" || !window.localStorage) {
            return;
        }

        this.isLoading.set(true);
        this.jokeStream$.subscribe((retrievedQuote: string) => {
            this.quote.set(retrievedQuote);
        });
    }
}
