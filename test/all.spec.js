const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('all', () => {
    it('should accept when both accept', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.string('bar'));
        const result = parser.parse('foobarbaz');

        expect(result).to.equal(['foo', 'bar']);
    });

    it('should reject when first rejects', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.string('bar'));

        expect(() => parser.parse('faobar'))
            .to.throw(/expected.*"foo".*got.*"fao.*"/i);
    });

    it('should reject when others reject', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.string('bar'));

        expect(() => parser.parse('foofoo'))
            .to.throw(/expected.*"bar".*got.*"foo"/i);
    });

    it('should not reject on falsy responses', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.optional(Pr.string('bar')));
        expect(parser.parse('foo')).to.equal(['foo', null]);
    });

    it('should accept factories', () => {
        const parser = Pr.all(Pr.string('foo'), () => Pr.string('bar'));
        const result = parser.parse('foobar');

        expect(result).to.equal(['foo', 'bar']);
    });

    it('should pass previous values to factories (accept)', () => {
        const parser = Pr.all(Pr.letters(), Pr.string(','), ([letters, _]) => Pr.string(letters));
        const result = parser.parse('foo,foo');

        expect(result).to.equal(['foo', ',', 'foo']);
    });

    it('should pass previous values to factories (reject)', () => {
        const parser = Pr.all(Pr.letters(), Pr.string(','), ([letters, _]) => Pr.string(letters));
        expect(() => parser.parse('foo,bar')).to.throw(/expected.*"foo".*got.*"bar"/i);
    });

    it('should accept factory as first parser', () => {
        const parser = Pr.all(() => Pr.string('foo'), Pr.string('bar'));
        const result = parser.parse('foobar');

        expect(result).to.equal(['foo', 'bar']);
    });
});
