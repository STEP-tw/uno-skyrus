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

  describe('getName', function() {
    it('should return the name of the player', function() {
      const player = new Player('player', 1234);
      const expectedOutput = 'player';
      const actualOutput = player.getName();
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
      player.setPlayableCards(cards);
      const expectedOutput = cards;
      const actualOutput = player.getPlayableCards();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('addCard', function() {
    it('should add the given card to the player', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      const expectedOutput = [{ number: 4, color: 'red' }];
      const actualOutput = player.getCards();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('setDrawCardStatus', function() {
    it('should add the given card to the player', function() {
      const player = new Player('Player', 1234);
      player.setDrawCardStatus(true);
      const expectedOutput = true;
      const actualOutput = player.getDrawCardStatus();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('calculatePlayableCards', function() {
    it('should add the given card to the player', function() {
      const player = new Player('Player', 1234);
      const dummyCard = {
        color: 'red',
        number: 9,
        canPlayOnTopOf: () => true
      };
      player.addCards([dummyCard]);
      player.calculatePlayableCards({
        color: 'red',
        number: 7
      });
      const expectedOutput = [dummyCard];
      const actualOutput = player.getPlayableCards();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
