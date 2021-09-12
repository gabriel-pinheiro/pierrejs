import { Parser } from "../parser";
import { Result } from "../result";

export function stringParser(str: string): Parser<string> {
    return new Parser(`"${str}"`, function (state) {
        const { code, index } = state;
        const current = code.slice(index);

        if(current.length < str.length) {
            return Result.fail(state, `Expected ${this.name}, got "${current}<EOF>"`);
        }

        if(!current.startsWith(str)) {
            return Result.fail(state, `Expected ${this.name}, got "${current.slice(0, 16)}"`);
        }

        const nextState = state.update(index + str.length);
        return Result.ok(nextState, str);
    });
}
