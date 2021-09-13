const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

const Pr = require('../dist').default;

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

describe('excepted', () => {
    it('should always fail', () => {
        const parser = Pr.expected('something');
        expect(() => parser.parse('foo')).to.throw(/expected.*something.*got.*"foo"/i);
        expect(() => parser.parse('')).to.throw(/expected.*something.*got.*EOF/i);
    });
});
