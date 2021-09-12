import { Parser } from "../parser";
import { Result } from "../result";

export function oneOrManyParser<T>(parser: Parser<T>): Parser<T[]> {
    return new Parser(parser.name, state => {
        const value = [];
        let nextState = state;

        /* $lab:coverage:off$ */
        while (true) {
        /* $lab:coverage:on$ */
            const result: Result<any> = parser.applyTo(nextState);
            if (result.error) {
                if(value.length === 0) {
                    return result;
                } else {
                    return Result.ok(nextState, value);
                }
            }

            value.push(result.value);
            if(result.state.index === nextState.index) {
                return Result.ok(nextState, value);
            }

            nextState = result.state;
        }
    });
}