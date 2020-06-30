import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { AuthorizeEffects } from "./authorize.effects";

describe("AuthorizeEffects", () => {
    // tslint:disable-next-line:prefer-const
    let actions$: Observable<any>;
    let effects: AuthorizeEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthorizeEffects, provideMockActions(() => actions$)],
        });

        effects = TestBed.inject(AuthorizeEffects);
    });

    it("should be created", () => {
        expect(effects).toBeTruthy();
    });
});
