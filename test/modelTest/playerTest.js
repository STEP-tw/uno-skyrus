const { Player } = require('../../src/models/player');
const {
  SkipCard,
  WildCard,
  NumberedCard,
  DrawTwo,
  ReverseCard,
  WildDrawFour
} = require('./../../src/models/card');
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
  describe('getCardsCount', function() {
    it('should return the count of cards of player', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.addCard({ number: 9, color: 'green' });
      const expectedOutput = 2;
      const actualOutput = player.getCardsCount();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('hasWon', function() {
    it('should return true for player without cards', function() {
      const player = new Player('Player', 1234);
      const expectedOutput = true;
      const actualOutput = player.hasWon();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should return false for player with cards', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.addCard({ number: 9, color: 'green' });
      const expectedOutput = false;
      const actualOutput = player.hasWon();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('setUnoCall', function() {
    it('should set unoCallStatus to true if the player has only one card', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.setUnoCall(true);
      const expectedOutput = true;
      const actualOutput = player.unoCallStatus;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should set unoCallStatus to false if the player has more than one card', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.addCard({ number: 9, color: 'green' });
      player.setUnoCall(true);
      const expectedOutput = false;
      const actualOutput = player.unoCallStatus;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('resetUnoCall', function() {
    it('should set unoCallStatus to false', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.resetUnoCall();
      const expectedOutput = false;
      const actualOutput = player.unoCallStatus;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('setHasCaught', function() {
    it('should set hasCaught to true', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.setHasCaught();
      const expectedOutput = true;
      const actualOutput = player.hasCaught;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe('resetHasCaught', function() {
    it('should set hasCaught to false', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.resetHasCaught();
      const expectedOutput = false;
      const actualOutput = player.hasCaught;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe('getUnoCallStatus', function() {
    it('should get the value of status', function() {
      const player = new Player('Player', 1234);
      player.addCard({ number: 4, color: 'red' });
      player.getUnoCallStatus();
      const expectedOutput = false;
      const actualOutput = player.hasCaught;
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

// SCORE TESTS ---------------------------------------------------------------
describe('calcualte score', function() {
    it('should return 0 of player score', function(){
      const player = new Player("Metthew", 123);
      const expectedOutput = 0;
      const actualOutput = player.calculateScore();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return 141 of player score', function() {
      const player = new Player("Matthew", 123);
      player.addCard(new WildCard());
      player.addCard(new WildDrawFour());
      player.addCard(new ReverseCard('REVERSE', 'red'));
      player.addCard(new NumberedCard(1, 'red'));
      const expectedOutput = 141;
      const actualOutput = player.calculateScore();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
});

describe('get max card', function(){
    it('it should return the maximum number of cards in your hand', function(){
      const player = new Player("Matthew", 123);
      player.maxCard = 7;
      const expectedOutput = 7;
      const actualOutput = player.getMaxCard();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
    it('it should modify the maximum number of cards in your hand and return with it', function() {
      const player = new Player('Matthew', 123);
      player.maxCard = 4;
      const expectedOutput = 8;
      const actualOutput = player.getMaxCard(8);
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
	});
// --------------------------------------------------------------
});
