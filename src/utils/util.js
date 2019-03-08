const {
  NumberedCard,
  WildCard,
  DrawTwo,
  SkipCard,
  ReverseCard,
  WildDrawFour
} = require('./../models/card');
const { Player } = require('./../models/player');
const GAMES_FILE = './private/gamesData.json';

const generateGameKey = () => {
  return Date.now();
};

const writeData = function(fs, gameKey, game) {
  fs.readFile(GAMES_FILE, (err, gamesData) => {
    if (err) {
      console.log(err);
      return;
    }
    const games = JSON.parse(gamesData);
    games[gameKey] = game;
    fs.writeFile(GAMES_FILE, JSON.stringify(games), err => {
      if (err) {
        console.log(err);
      }
    });
  });
};

const loadData = function(fs, gameKey, loadGame) {
  fs.readFile(GAMES_FILE, (err, gamesFile) => {
    if (!err) {
      const gamesData = JSON.parse(gamesFile);
      loadGame(gameKey, gamesData[gameKey]);
    }
  });
};

const createCard = function(card) {
  if (card.isWildCard) {
    if (card.isDrawFour) {
      return new WildDrawFour();
    }
    return new WildCard();
  }
  if (card.isReverseCard) {
    return new ReverseCard(card.symbol, card.color);
  }
  if (card.isSkipCard) {
    return new SkipCard(card.symbol, card.color);
  }
  if (card.isDrawTwo) {
    return new DrawTwo(card.color);
  }
  return new NumberedCard(card.symbol, card.color);
};

const parseCards = function(deck) {
  return deck.map(card => {
    return createCard(card);
  });
};

const parsePlayer = function(playerData) {
  const player = new Player(
    playerData.name,
    playerData.id,
    parseCards(playerData.cards),
    parseCards(playerData.playableCards),
    playerData.canDrawCard,
    playerData.unoCallStatus
  );
  return player;
};

module.exports = {
  generateGameKey,
  writeData,
  loadData,
  parseCards,
  parsePlayer
};
