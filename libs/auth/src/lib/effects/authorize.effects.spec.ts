import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { AuthorizeEffects } from "./authorize.effects";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "@dpio-application/shared/src/lib/material.module";

describe("AuthorizeEffects", () => {
    // tslint:disable-next-line:prefer-const
    let actions$: Observable<any>;
    let effects: AuthorizeEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule],
            providers: [AuthorizeEffects, provideMockActions(() => actions$)],
        });

        effects = TestBed.inject(AuthorizeEffects);
    });

    it("should be created", () => {
        expect(effects).toBeTruthy();
    });
});
