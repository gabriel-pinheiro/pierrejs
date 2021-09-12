import { Parser } from "../parser";
import { Result } from "../result";

export function allParser<T>(...parsers: Parser<T>[]): Parser<T[]> {
    return new Parser(parsers[0].name, state => {
        const value: T[] = [];
        let nextState = state;

        for(const parser of parsers) {
            const result = parser.applyTo(nextState);
            if(result.error) {
                return result as Result<any>;
            }

            nextState = result.state;
            value.push(result.value);
        }

        return Result.ok(nextState, value);
    });
}
