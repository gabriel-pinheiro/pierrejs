import { Parser } from "../parser";
import { Result } from "../result";

export function endParser(): Parser<null> {
    return new Parser(`EOF`, state => {
        if(state.code.length === state.index) {
            return Result.ok(state, null);
        }

        return Result.fail(state, `Expected end of input, got "${state.code.slice(state.index, state.index + 16)}"`);
    });
}
