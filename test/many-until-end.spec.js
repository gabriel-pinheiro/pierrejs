const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;
const { Parser } = require('../dist/parser');
const { Result } = require('../dist/result');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('manyUntilEnd', () => {
    it('should consume none', () => {
        const parser = Pr.manyUntilEnd(Pr.string('a'));
        const result = parser.parse('');
        expect(result).to.equal([]);
    });

    it('should consume one', () => {
        const parser = Pr.manyUntilEnd(Pr.string('a'));
        const result = parser.parse('a');
        expect(result).to.equal(['a']);
    });

    it('should consume many', () => {
        const parser = Pr.manyUntilEnd(Pr.string('a'));
        const result = parser.parse('aaa');
        expect(result).to.equal(['a', 'a', 'a']);
    });
    
    it('should not loop forever', () => {
        const noop = new Parser('noop', state => Result.ok(state, 'val'));
        const parser = Pr.manyUntilEnd(noop);

        expect(parser.parse('')).to.equal(['val']);
    });

    it('should not leave unconsumed chars', () => {
        const parser = Pr.manyUntilEnd(Pr.string('a'));
        expect(() => parser.parse('aab')).to.throw(/Expected "a", got "b"/);
    });
});
