import { allParser } from "./parsers/all";
import { firstParser } from "./parsers/first";
import { stringParser } from "./parsers/string";

export default {
    string: stringParser,
    all: allParser,
    first: firstParser,
};
