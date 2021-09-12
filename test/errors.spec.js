const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('errors', () => {
    it('should show corrent line and column', () => {
        const parser = Pr.all(Pr.until(Pr.string('foo')), Pr.string('bar'));
        const text = [
            'first line, nothing here :)',
            'second line, nothing here either',
            'there we go, there is a foo here',
            'but foo is not bar o.o',
        ].join('\n');

        expect(() => parser.parse(text)).to.throw(/line 3, column 25:/i);
    });
});
