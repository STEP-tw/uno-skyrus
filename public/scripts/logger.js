/* eslint-disable no-unused-vars */
const generateStatusLog = function(log) {
  const logOptions = {
    'start-game': logStartGame,
    'join-game': logJoinGame,
    'leave-game': logLeaveGame,
    'throw-card': logThrowCard,
    'draw-card': logDrawCard,
    'call-uno': logCallUno,
    caught: logCaught,
    'wrong-catch': logWrongCatch,
    'refill-stack': logRefillStack
  };
  console.log(log.action);
  return logOptions[log.action](log);
};

const logStartGame = function(log) {
  const host = log.hostName;
  const status = document.createElement('span');
  status.innerText = '\u25B6 ' + host + ' has started the game.';
  return status;
};

const logJoinGame = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = '\u1F464' + player + ' has joined the game.';
  return status;
};

const logLeaveGame = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = player + ' has left the game.';
  return status;
};

const logThrowCard = function(log) {
  const player = log.playerName;
  const card = getCard(log.card);
  const status = document.createElement('span');
  status.innerText = player + ' has thrown ' + card;
  return status;
};

const logDrawCard = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = player + ' has drawn ' + log.cardCount + 'card(s)';
  return status;
};

const logCallUno = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = player + ' has Called UNO..';
  return status;
};

const logCaught = function(log) {
  const catcher = log.catcher;
  const victim = log.victim;
  const status = document.createElement('span');
  status.innerText = catcher + ' caught ' + victim;
  return status;
};

const logWrongCatch = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = player + ' has made a wrong catch';
  return status;
};

const logRefillStack = function(log) {
  return 'Stack has been refilled';
};

const getCard = function(card) {
  if (card.isDrawFour) {
    return generateDrawFour(card);
  }
  if (card.isWildCard) {
    return generateWildCard(card);
  }
  if (card.isDrawTwo) {
    return generateDrawTwo(card);
  }
  if (card.isSkipCard) {
    return generateSkipCard(card);
  }
  if (card.isReverseCard) {
    return generateReverseCard(card);
  }
  return generateNumberCard(card);
};

const generateWildCard = function() {
  return 'Wild Card';
};

const generateDrawTwo = function(card) {
  return card.color + ' draw two';
};

const generateSkipCard = function(card) {
  return card.color + ' skip';
};

const generateReverseCard = function(card) {
  return card.color + ' reverse card';
};

const generateNumberCard = function(card) {
  return card.symbol + ' of ' + card.color;
};

const generateDrawFour = function(card) {
  return ' draw four';
};
