const { Player } = require('../../src/models/player');
const chai = require('chai');

describe('addCards', function() {
  it('should add the given cards to the player', function() {
    const player = new Player('Reshmi');
    const cards = [{ number: 1, color: 'red' }, { number: 2, color: 'green' }];
    player.addCards(cards);
    const expectedOutput = [
      { number: 1, color: 'red' },
      { number: 2, color: 'green' }
    ];
    const actualOutput = player.getCards();
    chai.assert.deepEqual(actualOutput, expectedOutput);
  });
});
