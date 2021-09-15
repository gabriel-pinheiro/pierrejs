import { allParser } from "./parsers/all";
import { alphanumDashUnderscoreParser, alphanumParser, digitsParser, lettersParser, nonSpaceParser, spaceParser } from "./parsers/alphanum";
import { contextParser } from "./parsers/context";
import { eitherParser, oneOfParser } from "./parsers/either";
import { endParser } from "./parsers/end";
import { exceptParser } from "./parsers/except";
import { failParser } from "./parsers/fail";
import { lazyParser } from "./parsers/lazy";
import { lookAheadParser } from "./parsers/look-ahead";
import { manyParser, manyUntilEndParser, oneOrManyParser } from "./parsers/many";
import { optionalParser } from "./parsers/optional";
import { regexParser } from "./parsers/regex";
import { separatedByParser } from "./parsers/separated-by";
import { stringParser } from "./parsers/string";
import { untilParser } from "./parsers/until";

export default {
    string: stringParser,
    all: allParser,
    either: eitherParser,
    oneOf: oneOfParser,
    until: untilParser,
    many: manyParser,
    manyUntilEnd: manyUntilEndParser,
    oneOrMany: oneOrManyParser,
    end: endParser,
    except: exceptParser,
    optional: optionalParser,
    separatedBy: separatedByParser,
    lazy: lazyParser,
    fail: failParser,
    lookAhead: lookAheadParser,

    context: contextParser,

    regex: regexParser,
    letters: lettersParser,
    digits: digitsParser,
    alphanum: alphanumParser,
    alphanumDashUnderscore: alphanumDashUnderscoreParser,
    spaces: spaceParser,
    nonSpaces: nonSpaceParser,
};

/* $lab:coverage:off$ */
export { Parser } from "./parser";
export { Result } from "./result";
export { State } from "./state";
/* $lab:coverage:on$ */
