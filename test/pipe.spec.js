const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('pipe', () => {
    it('should return first Parser error', () => {
        const parser = Pr.string('foo')
            .pipe(Pr.string('bar'));

        expect(() => parser.parse('yada')).to.throw(/expeted.*"foo"/i);
    });

    it('should return last Parser error', () => {
        const parser = Pr.string('foo')
            .pipe(Pr.string('bar'));

        expect(() => parser.parse('foobaz')).to.throw(/expeted.*"bar"/i);
    });

    it('should return last Parser result', () => {
        const parser = Pr.string('foo')
            .pipe(Pr.string('bar'));

        expect(parser.parse('foobar')).to.equal('bar');
    });

    it('should pass context', () => {
        const parser = Pr.letters()
            .pipe(str => Pr.string(',').map(() => str))
            .pipe(str => Pr.string(str));
        
        expect(parser.parse('foo,foo')).to.equal('foo');
        expect(() => parser.parse('foo,bar')).to.throw(/expeted.*"foo"/i);
    });
});
