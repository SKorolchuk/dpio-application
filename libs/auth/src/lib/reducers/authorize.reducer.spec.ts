import { LoginPageReducer } from "./authorize.reducer";
import { initialLoginPageState } from "./authorize.state";

describe("Authorize Reducer", () => {
    describe("an unknown action handling", () => {
        it("should fallback and return the original baseline configuration previous state", () => {
            const unknownAction = { type: "@ngrx/store/init" };

            const processedState = LoginPageReducer(initialLoginPageState, unknownAction);

            expect(processedState).toBe(initialLoginPageState);
        });
    });
});
