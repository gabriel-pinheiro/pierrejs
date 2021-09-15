import { Result, State } from "..";
import { Parser } from "../parser";

export function contextParser<T>(name: string, generator: () => Iterator<Parser<any>, T>): Parser<T> {
    return new Parser(name, state => {
        const iterator = generator();

        let nextState: State = state;
        let previousResult: Result<any>;

        // true is never false, previousResult is never null (only undefined)
        /* $lab:coverage:off$ */
        while (true) {
            const { done, value: parserOrResult } = iterator.next(previousResult?.value);
        /* $lab:coverage:on$ */
            if (done) {
                return Result.ok(nextState, parserOrResult as T);
            }

            const parser = parserOrResult as Parser<any>;
            previousResult = parser.applyTo(nextState);
            nextState = previousResult.state;
            if(previousResult.error) {
                return previousResult;
            }
        }
    });
}
