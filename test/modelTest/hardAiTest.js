const { HardAi } = require('../../src/models/HardAi');
const { Game } = require('../../src/models/game.js');
const {
  SkipCard,
  WildCard,
  NumberedCard,
  DrawTwo,
  ReverseCard,
  WildDrawFour
} = require('./../../src/models/card');
const chai = require('chai');

describe('Hard Ai class', () => {
  describe('bestCard', function(){
    it('should get a best card in your hand', function(){
      const hardAi = new HardAi('Martin - Computer');
      hardAi.addCards(new NumberedCard(4, 'red'));
      hardAi.addCard(new NumberedCard(2, 'blue'));
      hardAi.addCard(new DrawTwo('+2', 'red'));
      hardAi.playableCards=hardAi.cards;
      const actualOutput = hardAi.getBestCard();
      const expectedOutput = { symbol: "+2", color: "red", isDrawTwo: true };
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('bestColor', function(){
    it('should get best color from you hand', function(){
      const hardAi = new HardAi('Martin - Computer');
      hardAi.addCard({ number: 5, color: "blue" });
      hardAi.addCard({ number: 2, color: "blue" });
      hardAi.addCard({ number: 3, color: "red" });
      const actualOutput = hardAi.getBestColor();
      const expectedOutput = "blue";
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe('calcualte score', function() {
    it('should return 0 of hardAi score', function(){
      const hardAi = new HardAi("Martin - Computer");
      const expectedOutput = 0;
      const actualOutput = hardAi.calculateScore();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
    it('should return 1 of hardAi score', function() {
      const hardAi = new HardAi("Martin - Computer");
      hardAi.addCard(new NumberedCard(1, 'blue'));
      const expectedOutput = 1;
      const actualOutput = hardAi.calculateScore();
      chai.assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
