import { Parser } from "../parser";

export function lazyParser<T>(factory: () => Parser<T>): Parser<T> {
    let parser = null;

    return new Parser('value', state => {
        if (parser === null) {
            parser = factory();
        }

        return parser.applyTo(state);
    });
}
