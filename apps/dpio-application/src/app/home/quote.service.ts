/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

const routes = {
    quote: (c: RandomQuoteContext): string => `/jokes/random?category=${c.category}`,
};

export interface RandomQuoteContext {
    readonly category: string;
}

interface QuoteResponseDTO {
    readonly value: string;
}

@Injectable({
    providedIn: "root",
})
export class QuoteService {
    private readonly http = inject(HttpClient);

    getRandomQuote(context: RandomQuoteContext): Observable<string> {
        return this.http.get<QuoteResponseDTO>(routes.quote(context)).pipe(
            map((body: QuoteResponseDTO) => body.value),
            catchError((_error: Error) => of("Error, could not load joke :-(")),
        );
    }
}
