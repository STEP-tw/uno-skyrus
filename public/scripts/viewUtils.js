/* eslint no-unused-vars: "off" */

const createCard = function(document, card, cardId) {
  if (card.isWildCard) {
    return createWildCard(document, cardId);
  }
  if (card.isDrawTwo) {
    return createDrawTwo(document, card, cardId);
  }
  return createNumberedCard(document, card, cardId);
};

const createNumberedCard = function(document, card, cardId) {
  const unoCard = document.createElement('div');
  unoCard.id = cardId;
  unoCard.className = 'uno-card theme-uno-card';

  const numberLeft = document.createElement('div');
  numberLeft.className = 'number-left';
  numberLeft.innerText = card.number;

  const cardInner = document.createElement('div');
  cardInner.className = 'theme-uno-card-inner';

  const designInner = document.createElement('div');
  designInner.className = 'theme-uno-design-inner white';
  // designInner.id = `design${cardId}`;

  cardInner.classList.add(card.color);

  const numberSpan = document.createElement('span');
  numberSpan.className = card.color;
  numberSpan.innerText = card.number;
  numberSpan.classList.add('num');
  designInner.appendChild(numberSpan);

  const numberRight = document.createElement('div');
  numberRight.className = 'number-right';
  numberRight.innerText = card.number;

  cardInner.appendChild(designInner);
  unoCard.appendChild(numberLeft);
  unoCard.appendChild(cardInner);
  unoCard.appendChild(numberRight);

  return unoCard;
};

const createPlayerCard = function(document, playerName) {
  const unoCard = document.createElement('div');
  unoCard.className = 'lobby-uno-card theme-uno-card';

  const cardInner = document.createElement('div');
  cardInner.className = 'theme-uno-card-inner black';

  const designInner = document.createElement('div');
  designInner.className = 'theme-uno-design-inner red';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'theme-color';
  nameSpan.innerText = playerName;

  if (!playerName) {
    nameSpan.innerText = '';
    nameSpan.className = 'loader';
  }

  designInner.appendChild(nameSpan);

  cardInner.appendChild(designInner);
  unoCard.appendChild(cardInner);

  return unoCard;
};

const createWildCard = function(document, cardId) {
  const unoCard = document.createElement('div');
  unoCard.className = 'uno-card theme-uno-card';
  unoCard.id = 'wild-card' + cardId;

  const cardInner = document.createElement('div');
  cardInner.className = 'theme-uno-card-inner black';

  const designInner = document.createElement('div');
  designInner.className = 'theme-uno-design-inner white';

  const numberSpan = document.createElement('span');
  numberSpan.innerText = 'w';
  numberSpan.className = 'num';

  designInner.appendChild(numberSpan);
  cardInner.appendChild(designInner);
  unoCard.appendChild(cardInner);

  return unoCard;
};

const createDrawTwo = function(document, card, cardId) {
  const unoCard = document.createElement('div');
  unoCard.id = cardId;
  unoCard.className = 'uno-card theme-uno-card';

  const numberLeft = document.createElement('div');
  numberLeft.className = 'number-left';
  numberLeft.innerText = card.symbol;

  const cardInner = document.createElement('div');
  cardInner.className = 'theme-uno-card-inner';

  const designInner = document.createElement('div');
  designInner.className = 'theme-uno-design-inner white';
  cardInner.classList.add(card.color);

  const numberSpan = document.createElement('span');
  numberSpan.className = card.color;
  numberSpan.innerText = card.symbol;
  numberSpan.classList.add('symbol');
  designInner.appendChild(numberSpan);

  const numberRight = document.createElement('div');
  numberRight.className = 'number-right';
  numberRight.innerText = card.symbol;

  cardInner.appendChild(designInner);
  unoCard.appendChild(numberLeft);
  unoCard.appendChild(cardInner);
  unoCard.appendChild(numberRight);

  return unoCard;
};
