import { Parser } from "../parser";
import { Result } from "../result";

export type Factory<T> = (values: T[]) => Parser<T>;

export function allParser<T>(...parsers: (Parser<T> | Factory<T>)[]): Parser<T[]> {
    return new Parser(parsers[0].name || 'value', state => {
        const value: T[] = [];
        let nextState = state;

        for(const parserOrFactory of parsers) {
            const parser = typeof parserOrFactory === 'function' ? parserOrFactory(value) : parserOrFactory;
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
