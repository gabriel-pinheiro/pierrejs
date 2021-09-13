import { Parser } from "../parser";
import { Result } from "../result";

export function eitherParser<T>(...parsers: Parser<T>[]): Parser<T> {
    const name = 'one of ' + parsers.map(p => p.name).join(", ");
    return new Parser(name, function (state) {
        // Error result that consumed the most chars
        let bestErrorResult: Result<T> = null;

        for(const parser of parsers) {
            const result = parser.applyTo(state);
            if(!result.error) {
                return result;
            }

            if(!bestErrorResult || result.state.index > bestErrorResult.state.index) {
                bestErrorResult = result;
            }
        }

        return bestErrorResult;
    });
}

export function oneOfParser<T>(...parsers: Parser<T>[]): Parser<T> {
    const name = 'one of ' + parsers.map(p => p.name).join(", ");
    return new Parser(name, function (state) {
        for(const parser of parsers) {
            const result = parser.applyTo(state);
            if(!result.error) {
                return result;
            }
        }

        const got = state.code.slice(state.index, state.index + 16);
        return Result.fail(state, `Expected ${this.name}, got "${got}"`);
    });
}
