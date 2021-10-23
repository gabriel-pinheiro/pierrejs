const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('map', () => {
    it('should mapped value', () => {
        const parser = Pr.string('foo')
            .map(() => 'bar');

        expect(parser.parse('foo')).to.equal('bar');
    });

    it('should pass original value', () => {
        const parser = Pr.letters()
            .map(v => v);

        expect(parser.parse('foo')).to.equal('foo');
    });

    it('should pass location', () => {
        const parser = Pr.all(Pr.string('foo'), Pr.string('bar').map((_, loc) => loc)).map(([, loc]) => loc);
        expect(parser.parse('foobar')).to.equal({
            start: 3,
            end: 6,
        });
    });
});
