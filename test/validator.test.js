import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Validator', () => {
  it('Simplified Schematics', () => {
    const foo = 'foo';
    expect(foo).to.be.a('string');
  });
});

