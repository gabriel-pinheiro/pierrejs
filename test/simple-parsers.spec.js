const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('..').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('string', () => {
    it('should accept correct string', () => {
        const parser = Pr.string('foo');
        const result = parser.parse('foobar');

        expect(result).to.equal('foo');
    });

    it('should fail on incorrect string', () => {
        const parser = Pr.string('foo');
        
        expect(() => parser.parse('bar'))
            .to.throw(/expected.*"foo".*got.*"bar"/i);
    });

    it('should fail on EOF', () => {
        const parser = Pr.string('foo');
        
        expect(() => parser.parse('fo'))
            .to.throw(/expected.*"foo".*got.*"fo<EOF>"/i);
    });
});

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
});

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

    it('should reject when all reject', () => {
        const parser = Pr.either(Pr.string('foo'), Pr.string('bar'));
        
        expect(() => parser.parse('baz'))
            .to.throw(/expected one of .*"foo", "bar".*got.*"baz"/i);
    });
});

describe('end', () => {
    it('should accept end of input', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.end());
        const result = parser.parse('foo');

        expect(result).to.equal(['foo', null]);
    });

    it('should reject when not at end', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.end());
        
        expect(() => parser.parse('foobar'))
            .to.throw(/expected.*end.*got.*"bar"/i);
    });
});
