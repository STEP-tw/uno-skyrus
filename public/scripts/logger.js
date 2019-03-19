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
  status.innerText = '👤 ' + player + ' has joined the game.';
  return status;
};

const logLeaveGame = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = '👤 ' + player + ' has left the game.';
  return status;
};

const logThrowCard = function(log) {
  const player = log.playerName;
  const card = getCard(log.card);
  const status = document.createElement('div');
  status.className = 'inner-status-div';
  const statusFirst = document.createElement('span');

  statusFirst.innerText = '👤 ' + player + ' has thrown ';
  status.appendChild(statusFirst);
  status.appendChild(card);
  return status;
};

const logDrawCard = function(log) {
  const status = document.createElement('div');
  status.className = 'inner-status-div';

  const statusFirst = document.createElement('span');
  statusFirst.innerText = '👤 ' + log.playerName + ' ';

  const drawIcon = document.createElement('img');
  drawIcon.className = 'status-icon';
  drawIcon.src = '/statusIcons/card-draw.svg';

  const statusLast = document.createElement('span');
  statusLast.innerText = ' × ' + log.cardCount;

  status.appendChild(statusFirst);
  status.appendChild(drawIcon);
  status.appendChild(statusLast);
  return status;
};

const logCallUno = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = '👤 ' + player + ' has Called UNO..';
  return status;
};

const logCaught = function(log) {
  const catcher = log.catcher;
  const victim = log.victim;
  const status = document.createElement('span');
  status.innerText = catcher + ' has caught ' + victim;
  return status;
};

const logWrongCatch = function(log) {
  const player = log.playerName;
  const status = document.createElement('span');
  status.innerText = '👤 ' + player + ' has made a wrong catch';
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
  const cardView = document.createElement('span');
  cardView.className = 'black-background';
  cardView.innerText = 'W';
  return cardView;
};

const generateDrawTwo = function(card) {
  const cardView = document.createElement('span');
  cardView.className = card.color + '-background';
  cardView.innerHTML = card.symbol;
  return cardView;
};

const generateSkipCard = function(card) {
  const cardView = document.createElement('span');
  cardView.className = card.color + '-background';
  cardView.innerText = 'X';
  return cardView;
};

const generateReverseCard = function(card) {
  const cardView = document.createElement('span');
  cardView.className = card.color + '-background';
  cardView.innerHTML = '&#8693';
  return cardView;
};

const generateNumberCard = function(card) {
  const cardView = document.createElement('span');
  cardView.className = card.color + '-background';
  cardView.innerText = card.symbol;
  return cardView;
};

const generateDrawFour = function(card) {
  const cardView = document.createElement('span');
  cardView.className = 'black-background';
  cardView.innerHTML = card.symbol;
  return cardView;
};
