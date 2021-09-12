import { allParser } from "./parsers/all";
import { alphanumDashUnderscoreParser, alphanumParser, digitsParser, lettersParser } from "./parsers/alphanum";
import { firstParser } from "./parsers/first";
import { stringParser } from "./parsers/string";

export default {
    string: stringParser,
    all: allParser,
    first: firstParser,

    letters: lettersParser,
    digits: digitsParser,
    alphanum: alphanumParser,
    alphanumDashUnderscore: alphanumDashUnderscoreParser,
};
