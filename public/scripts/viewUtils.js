/* eslint no-unused-vars: "off" */

const createCard = function(document, card) {
  const unoCard = document.createElement('div');
  unoCard.className = 'uno-card';
  unoCard.style.setProperty('background', card.color);

  const cardInner = document.createElement('div');
  cardInner.className = 'uno-card-inner';

  const designInner = document.createElement('div');
  designInner.className = 'uno-design-inner';
  designInner.innerText = card.number;

  cardInner.appendChild(designInner);
  unoCard.appendChild(cardInner);

  return unoCard;
};
