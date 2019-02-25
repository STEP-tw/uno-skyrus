const { Game } = require('../../src/models/game.js');
const chai = require('chai');

const {
  twoCards,
  dummyShuffler,
  numberDeck,
  tenCards,
  sevenCards
} = require('../testHelpers/testHelpers.js');

describe('Game Class', () => {
  describe('startGame', function() {
    let game;

    beforeEach(function() {
      const identity = deck => deck;
      const player = {
        id: 1234,
        name: 'player',
        cards: [],
        addCards: function(cards) {
          player.cards = cards;
        },
        calculatePlayableCards: () => {}
      };
      const players = {
        getPlayers: () => {
          return [player];
        },
        setFirstTurn: () => {},
        setCurrentPlayer: () => {}
      };
      game = new Game(numberDeck, 1, 1234, players);
      game.startGame(identity);
    });

    it('startGame method should create stack', function() {
      const actual = game.stack;
      const expected = [{ color: 'red', number: 1 }];
      chai.assert.deepEqual(actual, expected);
    });

    it('startGame method should initialize pile', function() {
      const actual = game.pile;
      const expected = [{ number: 2, color: 'green' }];
      chai.assert.deepEqual(actual, expected);
    });

    it('should assign 7 cards to each player', function() {
      const expectedOutput = [
        { number: 3, color: 'blue' },
        { number: 4, color: 'yellow' },
        { number: 5, color: 'red' },
        { number: 6, color: 'green' },
        { number: 7, color: 'blue' },
        { number: 8, color: 'blue' },
        { number: 9, color: 'green' }
      ];
      const actualOutput = game.getPlayerCards(1234);
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('getTopDiscard', function() {
    it('getTopDiscard should return topDicard from pile', function() {
      const players = {
        getPlayers: () => [],
        setFirstTurn: () => {},
        setCurrentPlayer: () => {}
      };
      const game = new Game(twoCards, 0, 1234, players);
      game.startGame(dummyShuffler);
      const actual = game.getTopDiscard();
      const expected = { color: 'red', number: 5 };
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getPlayers', function() {
    it('should return all players', function() {
      const players = {
        players: [{ name: 'player', cards: [] }]
      };
      const game = new Game(twoCards, 0, 1234, players);
      const actual = game.getPlayers();
      const expected = { players: [{ name: 'player', cards: [] }] };
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getPlayersCount', function() {
    it('should return all players', function() {
      const game = new Game(twoCards, 0, 1234, {});
      const actual = game.getPlayersCount();
      const expected = 0;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getKey', function() {
    it('should return all players', function() {
      const game = new Game(twoCards, 0, 1234, {});
      const actual = game.getKey();
      const expected = 1234;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('hasStarted', function() {
    it('should return false when game has not started', function() {
      const game = new Game(twoCards, 0, 1234, {});
      const actual = game.hasStarted();
      const expected = false;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('throw card', () => {
    let game;
    const logMessage = () => {};
    const canPlayOnTopOf = () => true;

    beforeEach(() => {
      numberDeck[5] = { number: 6, color: 'green', canPlayOnTopOf: () => true };

      const identity = deck => deck;
      const player = {
        id: 1234,
        name: 'player',
        cards: [],
        getName: () => {
          return 'player';
        },
        calculatePlayableCards: () => {},
        addCards: function(cards) {
          player.cards = cards;
        },
        getPlayableCards: () => {
          return [];
        },
        getId() {
          return player.id;
        },
        removeCard(cardId) {
          player.cards.splice(cardId, 1);
        },
        getCards() {
          console.log(player.cards, 'this is player cards');
          return player.cards;
        }
      };
      const players = {
        getPlayers: () => {
          return [player];
        },
        getCurrentPlayer: () => {
          return player;
        },
        getPlayer() {
          return player;
        },
        setFirstTurn: () => {},
        setCurrentPlayer: () => {},
        updateCurrentPlayer: () => {}
      };

      const deck = [
        { number: 1, color: 'yellow', logMessage, canPlayOnTopOf },
        { number: 2, color: 'green', logMessage, canPlayOnTopOf },
        { number: 3, color: 'blue', logMessage, canPlayOnTopOf },
        { number: 4, color: 'yellow', logMessage, canPlayOnTopOf },
        { number: 5, color: 'red', logMessage, canPlayOnTopOf },
        { number: 6, color: 'red', logMessage, canPlayOnTopOf },
        { number: 7, color: 'blue', logMessage, canPlayOnTopOf },
        { number: 8, color: 'blue', logMessage, canPlayOnTopOf },
        { number: 9, color: 'green', logMessage, canPlayOnTopOf }
      ];

      game = new Game(deck, 1, 1234, players, { addLog: () => {} });
      game.startGame(identity);
    });
    it('should remove card from player hand and put it on top of pile', () => {
      game.throwCard(1234, '3');
      const actual = game.getPlayerCards(1234);
      const expected = [
        { number: 3, color: 'blue', logMessage, canPlayOnTopOf },
        { number: 4, color: 'yellow', logMessage, canPlayOnTopOf },
        { number: 5, color: 'red', logMessage, canPlayOnTopOf },
        { number: 7, color: 'blue', logMessage, canPlayOnTopOf },
        { number: 8, color: 'blue', logMessage, canPlayOnTopOf },
        { number: 9, color: 'green', logMessage, canPlayOnTopOf }
      ];
      chai.assert.deepEqual(actual, expected);
    });
    it('should remove card from player hand and put it on top of pile', () => {
      const expected = game.pile;
      game.throwCard(124, '3');
      const actual = game.pile;
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('drawCard', function() {
    it('should remove a card from stack', function() {
      const player = {
        addCard: () => {},
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        getName: () => 'player',
        getDrawCardStatus: () => true,
        setDrawCardStatus: () => {},
        setPlayableCards: () => {},
        id: 234
      };
      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player,
        changeTurn: () => {}
      };
      const card = {
        number: 4,
        color: 'red',
        canPlayOnTopOf: () => true
      };
      const activityLog = {
        addLog: () => {}
      };
      const nineCards = sevenCards.slice();
      nineCards.unshift(card);
      nineCards.unshift(card);
      nineCards.unshift(card);
      const game = new Game(nineCards, 0, 1234, players, activityLog);
      game.startGame(dummyShuffler);
      game.drawCard(234);
      const actual = game.stack;
      const expected = [card];
      chai.assert.deepEqual(actual, expected);
    });
    it('should remove a card from stack and pass turn if it  is not playable', function() {
      const player = {
        addCard: () => {},
        getName: () => 'player',
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        getDrawCardStatus: () => true,
        setDrawCardStatus: () => {},
        setPlayableCards: () => {},
        id: 234
      };
      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player,
        changeTurn: () => {}
      };
      const card = {
        number: 4,
        color: 'red',
        canPlayOnTopOf: () => false
      };
      const activityLog = {
        addLog: () => {}
      };
      const nineCards = sevenCards.slice();
      nineCards.unshift(card);
      nineCards.unshift(card);
      nineCards.unshift(card);
      const game = new Game(nineCards, 0, 1234, players, activityLog);
      game.startGame(dummyShuffler);
      game.drawCard(234);
      const actual = game.stack;
      const expected = [card];
      chai.assert.deepEqual(actual, expected);
    });

    it('should not remove a card from stack if not current player', function() {
      const player = {
        addCard: () => {},
        calculatePlayableCards: () => {},
        addCards: () => {},
        getId: () => 234,
        id: 234
      };
      const players = {
        getCurrentPlayer: () => player,
        getPlayers: () => [player],
        setCurrentPlayer: () => player
      };
      const game = new Game(tenCards, 0, 1234, players);
      game.startGame(dummyShuffler);
      game.drawCard(235);
      const actual = game.stack;
      const expected = [
        { number: 2, color: 'green' },
        { number: 3, color: 'blue' }
      ];
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('getStack', function() {
    it('should return stack', function() {
      const game = new Game(numberDeck, 0, 1234, {});
      const actual = game.getStack();
      const expected = [];
      chai.assert.deepEqual(actual, expected);
    });
  });

  describe('refillStack', function() {
    it('should refill the stack from pile except topDiscard', function() {
      const game = new Game(numberDeck, 0, 1234, {}, { addLog: () => {} });
      game.pile = twoCards;
      game.stack = [];
      game.refillStack();
      const actual = game.getStack();
      const expected = [{ color: 'red', number: 5 }];
      chai.assert.deepEqual(actual, expected);
    });
  });
  
  describe('hasWon', () => {
    let game;
    beforeEach(() => {
      game = new Game([], 1, 1234, {}, { addLog: () => {} });
    });
    it('should return true for the palyer', () => {
      const player = {
        getCards: () => [],
        getName: () => 'player'
      };
      chai.assert.equal(true, game.hasWon(player));
    });
  });
});
