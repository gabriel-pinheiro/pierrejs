const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('lookAhead', () => {
    it('should return error', () => {
        const parser = Pr.lookAhead(Pr.string('foo'));
        expect(() => parser.parse('bar')).to.throw(/expected.*"foo"/i);
    });

    it('should return value without consuming', () => {
        const parser = Pr.lookAhead(Pr.string('foo'))
            .pipe(o => Pr.string('foo').map(i => [o, i]))
            .pipe(o => Pr.string('bar').map(i => [...o, i]));

        expect(parser.parse('foobar')).to.equal(['foo', 'foo', 'bar']);
    });
});
