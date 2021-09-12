const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('except', () => {
    it('should fail on EOF', () => {
        const parser = Pr.except(Pr.string('foo'));
        expect(() => parser.parse('')).to.throw(/Unexpected end of input/);
    });

    it('should fail if nothing except', () => {
        const parser = Pr.except(Pr.string('foo'));
        expect(() => parser.parse('foo')).to.throw(/Unexpected "foo"/);
    });

    it('should consume char', () => {
        const parser = Pr.except(Pr.string('foo'));
        expect(parser.parse('abc')).to.equal('a');
    });
    
    it('should work with many', () => {
        const escapedQuote = Pr.string('\\"').map(() => '"');
        const quote = Pr.string('"').withName('quote');
        const nonQuote = Pr.except(quote);
        const jsonStringContent = Pr.many(Pr.either(escapedQuote, nonQuote))
            .map(chars => chars.join(''));
        const jsonString = Pr.all(quote, jsonStringContent, quote)
            .map(([, content, ]) => content);

        expect(jsonString.parse('"abc"')).to.equal('abc');
        expect(jsonString.parse('"ab\\"c"')).to.equal('ab"c');
        expect(jsonString.parse('""')).to.equal('');
        expect(() => jsonString.parse('"yada yada')).to.throw(/expected quote/i);
    });
});
