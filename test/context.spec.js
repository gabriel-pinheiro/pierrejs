const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('context', () => {

    it('should resolve returned value', () => {
        const parser = Pr.context('', function*() {
            return 'foo';
        });

        expect(parser.parse('')).to.equal('foo');
    });

    it('should apply yielded parsers', () => {
        const parser = Pr.context('', function*() {
            return yield Pr.string('foo');
        });

        expect(parser.parse('foo')).to.equal('foo');
        expect(() => parser.parse('bar')).to.throw();
    });
});
