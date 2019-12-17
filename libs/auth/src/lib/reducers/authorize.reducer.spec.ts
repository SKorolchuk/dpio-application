import { LoginPageReducer } from "./authorize.reducer";
import { initialLoginPageState } from "./authorize.state";

describe("Authorize Reducer", () => {
    describe("an unknown action", () => {
        it("should return the previous state", () => {
            const action = {} as any;

            const result = LoginPageReducer(initialLoginPageState, action);

            expect(result).toBe(initialLoginPageState);
        });
    });
});
