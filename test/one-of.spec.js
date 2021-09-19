const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('oneOf', () => {
    it('should accept when first accepts', () => {
        const parser = Pr.oneOf(Pr.string('foo'), Pr.string('bar'));
        const result = parser.parse('foo :)');

        expect(result).to.equal('foo');
    });

    it('should accept when others accept', () => {
        const parser = Pr.oneOf(Pr.string('foo'), Pr.string('bar'));
        const result = parser.parse('bar :)');

        expect(result).to.equal('bar');
    });

    it('should accept falsy responses', () => {
        const parser = Pr.oneOf(Pr.string('foo'), Pr.optional(Pr.string('bar')));
        expect(parser.parse('')).to.equal(null);
    });

    it('should reject when all reject', () => {
        const parser = Pr.oneOf(Pr.string('foo'), Pr.string('bar'));

        expect(() => parser.parse('baz'))
            .to.throw(/expected one of .*"foo", "bar".*got.*"baz"/i);
    });
});
