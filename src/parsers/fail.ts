import { Parser } from "../parser";
import { Result } from "../result";

export function failParser(error: string): Parser<any> {
    return new Parser(error, state => {
        return Result.fail(state, error);
    });
}
