const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

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
