/* eslint no-unused-vars: "off" */

const createCard = function(document, card) {
  const unoCard = document.createElement('div');
  unoCard.className = 'uno-card';

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
