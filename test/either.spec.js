const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('either', () => {
    it('should accept when first accepts', () => {
        const parser = Pr.either(Pr.string('foo'), Pr.string('bar'));
        const result = parser.parse('foo :)');

        expect(result).to.equal('foo');
    });

    it('should accept when others accept', () => {
        const parser = Pr.either(Pr.string('foo'), Pr.string('bar'));
        const result = parser.parse('bar :)');

        expect(result).to.equal('bar');
    });

    it('should accept falsy responses', () => {
        const parser = Pr.either(Pr.string('foo'), Pr.end());
        expect(parser.parse('')).to.equal(null);
    });

    it('should reject with the best match when all reject', () => {
        const parser = Pr.either(
            Pr.all(Pr.string('f'), Pr.string('o')),
            Pr.all(Pr.string('b'), Pr.string('a')),
            Pr.all(Pr.string('q'), Pr.string('u'))
        );

        expect(() => parser.parse('bx'))
            .to.throw('Expected "a", got "x"');
    });
});
