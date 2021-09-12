import { Parser } from "../parser";
import { Result } from "../result";

export function exceptParser(parser: Parser<any>): Parser<string> {
    return new Parser('anything but ' + parser.name, state => {
        const { code, index } = state;
        const char = code.charAt(index);
        const result = parser.applyTo(state);
        if(char.length === 0) {
            return Result.fail(state, 'Unexpected end of input');
        }

        if (result.error) {
            const nextState = state.update(index + 1);
            return Result.ok(nextState, char);
        }

        return Result.fail(state, `Unexpected ${parser.name}`);
    });
}
