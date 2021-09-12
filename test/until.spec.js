const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('until', () => {
    it('should fail on EOF', () => {
        const parser = Pr.until(Pr.string('foo'));
        expect(() => parser.parse('')).to.throw(/Unexpected end of input/);
    });

    it('should fail on EOF after consuming', () => {
        const parser = Pr.until(Pr.string('foo'));
        expect(() => parser.parse('abc')).to.throw(/Unexpected end of input/);
    });

    it('should fail if nothing until', () => {
        const parser = Pr.until(Pr.string('foo'));
        expect(() => parser.parse('foo')).to.throw(/Unexpected "foo"/);
    });

    it('should consume until', () => {
        const parser = Pr.until(Pr.string('foo'));
        expect(parser.parse('abcfoo')).to.equal('abc');
    });

    it('should work between other parsers', () => {
        const open = Pr.string('{{');
        const close = Pr.string('}}');
        const parser = Pr.all(open, Pr.until(close), close);

        expect(parser.parse('{{abc}}')).to.equal(['{{', 'abc', '}}']);
    });

    it('should accept until end', () => {
        const parser = Pr.until(Pr.end());
        expect(parser.parse('abc')).to.equal('abc');
    });
});
