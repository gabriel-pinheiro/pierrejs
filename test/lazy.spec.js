const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('lazy', () => {
    it('should accept when fn accepts', () => {
        const parser = Pr.lazy(() => Pr.string('foo'));
        expect(parser.parse('foo')).to.equal('foo');
    });

    it('should reject when fn rejects', () => {
        const parser = Pr.lazy(() => Pr.string('foo'));
        expect(() => parser.parse('bar')).to.throw(/expected "foo"/i);
    });

    it('should be able to self reference', () => {
        const parser = Pr.lazy(() => Pr.oneOf(
            Pr.string('foo'),
            Pr.all(Pr.string('!'), parser),
        ));

        expect(parser.parse('!!!foo')).to.equal(['!', ['!', ['!', 'foo']]]);
    });
});
