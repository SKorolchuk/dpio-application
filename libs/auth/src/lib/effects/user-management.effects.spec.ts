import { TestBed, inject } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";
import { UserManagementEffects } from "./user-management.effects";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("AuthorizeEffects", () => {
    // tslint:disable-next-line:prefer-const
    let actions$: Observable<any>;
    let effects: UserManagementEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
            providers: [UserManagementEffects, provideMockActions(() => actions$)],
        });

        effects = TestBed.inject(UserManagementEffects);
    });

    it("should be created", () => {
        expect(effects).toBeTruthy();
    });
});
