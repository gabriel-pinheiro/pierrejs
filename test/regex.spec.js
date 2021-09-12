const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('letters', () => {
    it('should consume all letters until EOF', () => {
        const parser = Pr.letters();
        const result = parser.parse('abc');

        expect(result).to.equal('abc');
    });

    it('should consume all letters until non-letter', () => {
        const parser = Pr.letters();
        const result = parser.parse('abc1');

        expect(result).to.equal('abc');
    });

    it('should fail if no letters', () => {
        const parser = Pr.letters();
        expect(() => parser.parse('123')).to.throw(/expected letters.*got "123"/i);
    });

    it('should fail if EOF', () => {
        const parser = Pr.letters();
        expect(() => parser.parse('')).to.throw(/expected letters.*got EOF/i);
    });

    it('should consume after start', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.letters());
        const result = parser.parse('foobar');

        expect(result).to.equal(['foo', 'bar']);
    });
});

describe('other regex parsers', () => {
    it('digits should consume digits', () => {
        const parser = Pr.digits();
        const result = parser.parse('123a');

        expect(result).to.equal('123');
    });

    it('alphanum should consume digits and letters', () => {
        const parser = Pr.alphanum();
        const result = parser.parse('1a2b!!');

        expect(result).to.equal('1a2b');
    });

    it('alphanumDashUnderscore should consume digits, letters, _ and -', () => {
        const parser = Pr.alphanumDashUnderscore();
        const result = parser.parse('1a-2b_!!');

        expect(result).to.equal('1a-2b_');
    });
});
