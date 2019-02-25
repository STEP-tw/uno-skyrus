/* eslint no-unused-vars: "off" */

const createCard = function(document, card, cardId) {
  if (card.isWildCard) {
    return createWildCard(document, cardId);
  }
  return createNumberedCard(document, card, cardId);
};

const createNumberedCard = function(document, card, cardId) {
  const unoCard = document.createElement('div');
  unoCard.className = 'uno-card';
  unoCard.id = cardId;

  const numberLeft = document.createElement('div');
  numberLeft.className = 'number-left';
  numberLeft.innerText = card.number;

  const cardInner = document.createElement('div');
  cardInner.className = 'uno-card-inner';

  const designInner = document.createElement('div');
  designInner.className = 'uno-design-inner';
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
  unoCard.className = 'lobby-uno-card';

  const cardInner = document.createElement('div');
  cardInner.className = 'lobby-uno-card-inner';

  const designInner = document.createElement('div');
  designInner.className = 'lobby-uno-design-inner';

  const nameSpan = document.createElement('span');
  nameSpan.innerText = playerName;
  nameSpan.className = 'name-of-player';

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
  unoCard.className = 'uno-card';
  unoCard.id = 'wild-card' + cardId;

  const cardInner = document.createElement('div');
  cardInner.className = 'uno-card-inner';

  const designInner = document.createElement('div');
  designInner.className = 'uno-design-inner';

  const numberSpan = document.createElement('span');
  numberSpan.innerText = 'W';
  numberSpan.classList.add('num');

  designInner.appendChild(numberSpan);
  cardInner.appendChild(designInner);
  unoCard.appendChild(cardInner);

  return unoCard;
};
