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
        const parser = Pr.all(Pr.string('foo'), Pr.end());
        expect(parser.parse('foo')).to.equal(['foo', null]); 
    });
});
