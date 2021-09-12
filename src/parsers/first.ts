import { Parser } from "../parser";
import { Result } from "../result";

export function firstParser<T>(...parsers: Parser<T>[]): Parser<T> {
    const name = 'one of ' + parsers.map(p => p.name).join(", ");
    return new Parser(name, state => {
        for(const parser of parsers) {
            const result = parser.applyTo(state);
            if(result.value) {
                return result;
            }
        }

        const got = state.code.slice(state.index, state.index + 16);
        return Result.fail(state, `Expected ${name}, got "${got}"`);
    });
}