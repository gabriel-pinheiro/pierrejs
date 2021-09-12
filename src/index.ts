import { allParser } from "./parsers/all";
import { alphanumDashUnderscoreParser, alphanumParser, digitsParser, lettersParser } from "./parsers/alphanum";
import { firstParser } from "./parsers/first";
import { stringParser } from "./parsers/string";
import { untilParser } from "./parsers/until";

export default {
    string: stringParser,
    all: allParser,
    first: firstParser,
    until: untilParser,

    letters: lettersParser,
    digits: digitsParser,
    alphanum: alphanumParser,
    alphanumDashUnderscore: alphanumDashUnderscoreParser,
};
