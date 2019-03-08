/* eslint no-unused-vars: "off" */
const createCard = function(document, card, cardId) {
  let spanClass = card.color + ' symbol';
  let innerColor = card.color;
  let id = cardId;

  if (card.isWildCard) {
    id = 'wild-card' + cardId;
    spanClass = 'symbol';
    innerColor = 'black';
  }

  return createNumberedCard(document, card, id, innerColor, spanClass);
};

const createOuterLayout = function(document, cardId) {
  const unoCard = document.createElement('div');
  unoCard.id = cardId;
  unoCard.className = 'uno-card theme-uno-card';
  return unoCard;
};

const createInnerText = function(document, className, text) {
  const outerText = document.createElement('div');
  outerText.className = className;
  outerText.innerHTML = text;
  return outerText;
};

const createInnerLayout = function(document, color) {
  const cardInner = document.createElement('div');
  cardInner.className = `theme-uno-card-inner ${color}`;
  return cardInner;
};

const createInnerDesign = function(document, color = 'white') {
  const designInner = document.createElement('div');
  designInner.className = `theme-uno-design-inner ${color}`;
  return designInner;
};

const createInnerSpan = function(document, className, text) {
  const numberSpan = document.createElement('span');
  numberSpan.className = className;
  numberSpan.innerHTML = text;
  return numberSpan;
};

const createNumberedCard = function(
  document,
  card,
  cardId,
  innerColor,
  spanClass
) {
  const unoCard = createOuterLayout(document, cardId);

  const cardInner = createInnerLayout(document, innerColor);

  const numberLeft = createInnerText(document, 'number-left', card.symbol);

  const designInner = createInnerDesign(document);

  const numberSpan = createInnerSpan(document, spanClass, card.symbol);

  const numberRight = createInnerText(document, 'number-right', card.symbol);

  designInner.appendChild(numberSpan);
  cardInner.appendChild(designInner);
  unoCard.appendChild(numberLeft);
  unoCard.appendChild(cardInner);
  unoCard.appendChild(numberRight);

  return unoCard;
};

// const createWildCard = function(document, card, cardId) {
//   const unoCard = createOuterLayout(document, cardId);

//   const cardInner = createInnerLayout(document, innerColor);

//   const numberLeft = createInnerText(document, 'number-left', card.symbol);

//   const designInner = createInnerDesign(document);

//   const numberSpan = createInnerSpan(document, spanClass, card.symbol);

//   const numberRight = createInnerText(document, 'number-right', card.symbol);

//   designInner.appendChild(numberSpan);
//   cardInner.appendChild(designInner);
//   unoCard.appendChild(numberLeft);
//   unoCard.appendChild(cardInner);
//   unoCard.appendChild(numberRight);

//   return unoCard;
// };

const createPlayerCard = function(document, playerName) {
  const unoCard = document.createElement('div');
  unoCard.className = 'lobby-uno-card theme-uno-card';

  const cardInner = createInnerLayout(document, 'black');

  const designInner = createInnerDesign(document, 'red');

  const nameSpan = createInnerSpan(document, 'theme-color', playerName);

  if (!playerName) {
    nameSpan.innerText = '';
    nameSpan.className = 'loader';
  }

  designInner.appendChild(nameSpan);
  cardInner.appendChild(designInner);
  unoCard.appendChild(cardInner);

  return unoCard;
};
