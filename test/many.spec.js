const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('many', () => {
    it('should consume none', () => {
        const parser = Pr.many(Pr.string('a'));
        const result = parser.parse('');
        expect(result).to.equal([]);
    });

    it('should consume one', () => {
        const parser = Pr.many(Pr.string('a'));
        const result = parser.parse('ab');
        expect(result).to.equal(['a']);
    });

    it('should consume many', () => {
        const parser = Pr.many(Pr.string('a'));
        const result = parser.parse('aaa');
        expect(result).to.equal(['a', 'a', 'a']);
    });
});
