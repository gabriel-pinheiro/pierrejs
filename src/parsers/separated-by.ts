import { Parser } from "../parser";
import { allParser } from "./all";
import { manyParser } from "./many";
import { optionalParser } from "./optional";

export function separatedByParser<T>(parser: Parser<T>, separator: Parser<any>): Parser<T[]> {
    const valueWithSep = allParser(parser, separator).map(([value, _sep]) => value);
    return optionalParser(
        allParser<T|T[]>(
            manyParser(valueWithSep),
            parser,
        ).map(([values, value]: [T[], T]) => [...values, value]),
    ).map(values => values || []);
}
