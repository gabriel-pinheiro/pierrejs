import { Parser } from "../parser";
import { Result } from "../result";

export function stringParser(str: string) {
    return new Parser(`"${str}"`, state => {
        const { code, index } = state;
        const current = code.slice(index);

        if(current.length < str.length) {
            return Result.fail(state, `Expected "${str}", got "${current}<EOF>"`);
        }

        if(!current.startsWith(str)) {
            return Result.fail(state, `Expected "${str}", got "${current}"`);
        }

        const nextState = state.update(index + str.length);
        return Result.ok(nextState, str);
    });
}
