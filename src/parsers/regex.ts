import { Parser } from "../parser";
import { Result } from "../result";

export function regexParser(name: string, regex: RegExp): Parser<string> {
    return new Parser(name, function(state) {
        const { code, index } = state;
        const current = code.slice(index);

        if(current.length === 0) {
            return Result.fail(state, `Expected ${this.name}, got EOF"`);
        }

        const match = regex.exec(current);
        if(match === null) {
            return Result.fail(state, `Expected ${this.name}, got "${current.slice(0, 16)}"`);
        }

        const value = match[0];
        const nextState = state.update(index + value.length);
        return Result.ok(nextState, value);
    });
}
