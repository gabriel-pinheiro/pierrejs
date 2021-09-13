import { Parser } from "../parser";
import { Result } from "../result";

export function expectedParser(expected: string): Parser<any> {
    return new Parser(expected, state => {
        const { code, index } = state;
        const current = code.slice(index);
        const got = current.slice(0, 16);

        return Result.fail(state, `Expected ${expected}, got ${got ? `"${got}"` : 'EOF'}`);
    });
}
