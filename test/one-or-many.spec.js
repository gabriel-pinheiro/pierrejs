const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;
const { Parser } = require('../dist/parser');
const { Result } = require('../dist/result');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('oneOrMany', () => {
    it('should reject none', () => {
        const parser = Pr.oneOrMany(Pr.string('a'));
        expect(() => parser.parse('')).to.throw(/expected.*"a".*got.*EOF/i);
    });

    it('should consume one', () => {
        const parser = Pr.oneOrMany(Pr.string('a'));
        const result = parser.parse('ab');
        expect(result).to.equal(['a']);
    });

    it('should consume many', () => {
        const parser = Pr.oneOrMany(Pr.string('a'));
        const result = parser.parse('aaa');
        expect(result).to.equal(['a', 'a', 'a']);
    });
    
    it('should not loop forever', () => {
        const noop = new Parser('noop', state => Result.ok(state, 'val'));
        const parser = Pr.oneOrMany(noop);

        expect(parser.parse('')).to.equal(['val']);
    });
});
