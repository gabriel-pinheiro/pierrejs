import { Parser } from "../parser";
import { Result } from "../result";

export function manyParser<T>(parser: Parser<T>): Parser<T[]> {
    return new Parser(parser.name, state => {
        const value = [];
        let nextState = state;

        /* $lab:coverage:off$ */
        while (true) {
        /* $lab:coverage:on$ */
            const result = parser.applyTo(nextState);
            if (result.error) {
                return Result.ok(nextState, value);
            }

            value.push(result.value);
            if(result.state.index === nextState.index) {
                return Result.ok(nextState, value);
            }

            nextState = result.state;
        }
    });
}

export function manyUntilEndParser<T>(parser: Parser<T>): Parser<T[]> {
    return new Parser(parser.name, state => {
        const value = [];
        let nextState = state;

        /* $lab:coverage:off$ */
        while (true) {
        /* $lab:coverage:on$ */
            const result: Result<any> = parser.applyTo(nextState);
            if (result.error) {
                const hasReachedEnd = nextState.index === nextState.code.length;
                if(hasReachedEnd) {
                    return Result.ok(nextState, value);
                } else {
                    return result;
                }
            }

            value.push(result.value);
            if(result.state.index === nextState.index) {
                console.log('Preventing loops');
                return Result.ok(nextState, value);
            }

            nextState = result.state;
        }
    });
}

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
