const { Player } = require('../../src/models/player');
const chai = require('chai');
describe('Player class', () => {
  describe('addCards', function() {
    it('should add the given cards to the player', function() {
      const player = new Player('Reshmi');
      const cards = [
        { number: 1, color: 'red' },
        { number: 2, color: 'green' }
      ];
      player.addCards(cards);
      const expectedOutput = [
        { number: 1, color: 'red' },
        { number: 2, color: 'green' }
      ];
      const actualOutput = player.getCards();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe('getId', function() {
    it('should return the playerId of the player', function() {
      const player = new Player('player', 1234);
      const cards = [
        { number: 1, color: 'red' },
        { number: 2, color: 'green' }
      ];
      player.addCards(cards);
      const expectedOutput = 1234;
      const actualOutput = player.getId();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('removeCards', function() {
    it('should add the given cards to the player', function() {
      const player = new Player('Player', 1234);
      const cards = [
        { number: 1, color: 'red' },
        { number: 2, color: 'green' }
      ];
      player.addCards(cards);
      const expectedOutput = [{ number: 1, color: 'red' }];
      player.removeCard(1);
      const actualOutput = player.cards;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('getPlayableCardsFor', function() {
    it('should add the given cards to the player', function() {
      const player = new Player('Player', 1234);
      const cards = [
        { number: 1, color: 'red', canPlayOnTopOf: () => true },
        { number: 2, color: 'green', canPlayOnTopOf: () => false }
      ];
      player.addCards(cards);
      const expectedOutput = [cards[0]];
      const actualOutput = player.getPlayableCardsFor({
        number: 8,
        color: 'red'
      });
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
