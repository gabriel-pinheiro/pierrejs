import { Parser } from "../parser";
import { Result } from "../result";

export function optionalParser<T>(parser: Parser<T>): Parser<T | null> {
  return new Parser('optional ' + parser.name, state => {
    const result = parser.applyTo(state);
    if(result.error) {
      return Result.ok(state, null);
    }

    return result;
  });
}
