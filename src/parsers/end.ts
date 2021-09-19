import { Parser } from "../parser";
import { Result } from "../result";

export function endParser(): Parser<true> {
    return new Parser('end of input', function (state) {
        if(state.code.length === state.index) {
            return Result.ok(state, true);
        }

        return Result.fail(state, `Expected ${this.name}, got "${state.code.slice(state.index, state.index + 16)}"`);
    });
}
