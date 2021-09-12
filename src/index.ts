import { allParser } from "./parsers/all";
import { alphanumDashUnderscoreParser, alphanumParser, digitsParser, lettersParser, nonSpaceParser, spaceParser } from "./parsers/alphanum";
import { eitherParser } from "./parsers/either";
import { manyParser } from "./parsers/many";
import { stringParser } from "./parsers/string";
import { untilParser } from "./parsers/until";

export default {
    string: stringParser,
    all: allParser,
    either: eitherParser,
    until: untilParser,
    many: manyParser,

    letters: lettersParser,
    digits: digitsParser,
    alphanum: alphanumParser,
    alphanumDashUnderscore: alphanumDashUnderscoreParser,
    spaces: spaceParser,
    nonSpaces: nonSpaceParser,
};
