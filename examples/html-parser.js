/* 
 * This is just an example of PierreJS's usage.
 * It's not a complete HTML parser, not even close to it.
 */
const Pr = require('..').default;

const sampleString = `
<html>
    <head>
        <title>Hello World</title>
    </head>

    <body>
        Yayy
    </body>
</html>
`;

const optionalSpaces = Pr.optional(Pr.spaces());
const spaced = parser => Pr.all(optionalSpaces, parser, optionalSpaces)
    .map(([_s1, value, _s2]) => value)
    .withName(parser.name);

const beginTag = Pr.all(
    Pr.string('<'),
    Pr.letters(),
    Pr.string('>'),
).map(([_open, name, _close]) => name);

const endTagFactory = ([tag, _content]) => Pr.string(`</${tag}>`);

const text = Pr.until(Pr.oneOf(
    Pr.string('<'),
    Pr.end(),
));

const tag = Pr.lazy(() => Pr.all(
    beginTag,
    content,
    endTagFactory,
)).map(([tag, content, _end]) => ({ tag, content }));

const content = Pr.many(spaced(Pr.either(
    tag,
    text,
)));

console.log(JSON.stringify(content.parse(sampleString), null, 2));
