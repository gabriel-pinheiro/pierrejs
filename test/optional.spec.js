const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('optional', () => {
    it('should accept when present', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.optional(Pr.spaces()), Pr.string('bar'));
        const result = parser.parse('foo   bar');

        expect(result).to.equal(['foo', '   ', 'bar']);
    });

    it('should accept when not present', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.optional(Pr.spaces()), Pr.string('bar'));
        const result = parser.parse('foobar');

        expect(result).to.equal(['foo', null, 'bar']);
    });
});
