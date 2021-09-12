import { Parser } from "../parser";
import { Result } from "../result";

export function untilParser(parser: Parser<any>): Parser<string> {
    return new Parser('anything but ' + parser.name, state => {
        let nextState = state;
        let value = '';

        /* $lab:coverage:off$ */
        while(true) {
        /* $lab:coverage:on$ */
            const { code, index } = nextState;
            const current = code.slice(index);

            const result = parser.applyTo(nextState);
            if(!result.error) {
                if(value.length) return Result.ok(nextState, value);
                else             return Result.fail(nextState, 'Unexpected ' + parser.name);
            }

            if(current.length === 0) {
                return Result.fail(state, 'Unexpected end of input');
            }

            value += current.charAt(0);
            nextState = nextState.update(nextState.index + 1)
        }
    });
}
