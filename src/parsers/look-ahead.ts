import { Parser } from "../parser";
import { Result } from "../result";

export function lookAheadParser<T>(parser: Parser<T>): Parser<T> {
  return new Parser(parser.name, state => {
    const result = parser.applyTo(state);
    if(result.error) {
      return result;
    }

    return Result.ok(state, result.value);
  });
}
