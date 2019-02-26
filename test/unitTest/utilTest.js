const chai = require('chai');
const { modifySymbol } = require('../../src/utils/util.js');

describe('modifySymbol', function() {
  it('Should modify the card symbol to the original symbol in', function() {
    const card = { symbol: 'skip', color: 'red' };
    const actualOutput = modifySymbol(card);
    const expectedOutput = { symbol: '&#8856;', color: 'red' };

    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
