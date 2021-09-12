const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('many', () => {
    it('should consume none', () => {
        const parser = Pr.separatedBy(Pr.letters(), Pr.string(','));
        expect(parser.parse('')).to.equal([]);
    });

    it('should consume one', () => {
        const parser = Pr.separatedBy(Pr.letters(), Pr.string(','));
        expect(parser.parse('foo')).to.equal(['foo']);
    });

    it('should consume many', () => {
        const parser = Pr.separatedBy(Pr.letters(), Pr.string(','));
        expect(parser.parse('foo,bar,baz')).to.equal(['foo', 'bar', 'baz']);
    });
});
