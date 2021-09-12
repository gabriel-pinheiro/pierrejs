import { regexParser } from "./regex";

export const lettersParser = () => regexParser('letters', /^[a-zA-Z]+/);
export const digitsParser = () => regexParser('digits', /^[0-9]+/);
export const alphanumParser = () => regexParser('alphanumeric chars', /^[a-zA-Z0-9]+/);
export const alphanumDashUnderscoreParser = () => regexParser('alphanumeric chars, - or _', /^[a-zA-Z0-9_-]+/);
export const spaceParser = () => regexParser('spaces', /^\s+/);
export const nonSpaceParser = () => regexParser('non-spaces', /^\S+/);
