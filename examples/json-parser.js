/* 
 * This is just an example of PierreJS's usage.
 * It's not a complete JSON parser, not even negative numbers are supported.
 */
const Pr = require('..').default;

const sampleString = `
{
    "name": "Pierre!",
    "number": 1,
    "nested": {
        "good": true,
        "note": "Escaping quote work: \\" :)\"
    }
}`;

const escapedQuote = Pr.string('\\"').map(() => '"');
const quote = Pr.string('"').withName('quote');
const nonQuote = Pr.except(quote);

const optionalSpaces = Pr.optional(Pr.spaces());
const spaced = parser => Pr.all(optionalSpaces, parser, optionalSpaces)
    .map(([_s1, value, _s2]) => value)
    .withName(parser.name);

const stringContent = Pr.many(Pr.either(escapedQuote, nonQuote))
    .map(chars => chars.join(''));

const string = Pr.all(quote, stringContent, quote)
    .map(([_open, content, _close]) => content)
    .withName('string');
const number = Pr.digits()
    .map(n => parseInt(n))
    .withName('number');
const boolean = Pr.oneOf(Pr.string('true'), Pr.string('false'))
    .map(b => b === 'true')
    .withName('boolean');

const entity = Pr.lazy(() => spaced(Pr.oneOf(string, number, boolean, object)));

const fieldName = string.withName('field');
const fieldWithValue = Pr.all(fieldName, Pr.string(':'), entity)
    .map(([name, _, value]) => ({[name]: value}));
const field = spaced(fieldWithValue);

const object = spaced(Pr.all(
    Pr.string('{'),
    Pr.separatedBy(field, Pr.string(',')),
    Pr.string('}')
)).map(([_open, fields, _close]) => fields.reduce((acc, field) => ({...acc, ...field}), {}))
  .withName('object');


console.log(object.parse(sampleString));
