import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { provideStore, Store } from "@ngrx/store";

import { CallbackComponent } from "./callback.component";
import * as AuthActions from "../actions/authorize.actions";

describe("CallbackComponent", () => {
    let component: CallbackComponent;
    let fixture: ComponentFixture<CallbackComponent>;
    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CallbackComponent],
            providers: [provideStore(), provideRouter([])],
        }).compileComponents();

        store = TestBed.inject(Store);
        jest.spyOn(store, "dispatch");
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should create the callback component instance successfully", () => {
        expect(component).toBeTruthy();
    });

    it("should automatically dispatch the loginComplete action creator on component initialization", () => {
        expect(store.dispatch).toHaveBeenCalledWith(AuthActions.loginComplete());
    });
});
