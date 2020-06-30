import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

const routes = {
    quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`,
};

export interface RandomQuoteContext {
    // The quote's category: 'nerdy', 'explicit'...
    category: string;
}

@Injectable()
export class QuoteService {
    constructor(private http: HttpClient) {}

    getRandomQuote(context: RandomQuoteContext): Observable<string> {
        return this.http.get<{ value: string }>(routes.quote(context)).pipe(
            map((body) => body.value),
            catchError(() => of("Error, could not load joke :-(")),
        );
    }
}
