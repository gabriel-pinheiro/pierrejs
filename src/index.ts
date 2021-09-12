import { allParser } from "./parsers/all";
import { alphanumDashUnderscoreParser, alphanumParser, digitsParser, lettersParser, nonSpaceParser, spaceParser } from "./parsers/alphanum";
import { eitherParser } from "./parsers/either";
import { endParser } from "./parsers/end";
import { exceptParser } from "./parsers/except";
import { manyParser } from "./parsers/many";
import { manyUntilEndParser } from "./parsers/many-until-end";
import { oneOfParser } from "./parsers/one-of";
import { oneOrManyParser } from "./parsers/one-or-many";
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

    letters: lettersParser,
    digits: digitsParser,
    alphanum: alphanumParser,
    alphanumDashUnderscore: alphanumDashUnderscoreParser,
    spaces: spaceParser,
    nonSpaces: nonSpaceParser,
};
