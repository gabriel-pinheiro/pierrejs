const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('end', () => {
    it('should accept end of input', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.end());
        const result = parser.parse('foo');

        expect(result).to.equal(['foo', true]);
    });

    it('should reject when not at end', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.end());

        expect(() => parser.parse('foobar'))
            .to.throw(/expected.*end.*got.*"bar"/i);
    });
});
