/* eslint no-unused-vars: "off" */
const createCard = function (document, card, cardId) {
  let spanClass = card.color + ' symbol';
  let innerColor = card.color;
  let id = cardId;

  if (card.isWildCard) {
    id = 'wild-card' + cardId;
    spanClass = 'symbol';
    innerColor = 'black';
  }

  return createUnoCard(document, card, id, innerColor, spanClass);
};

const createOuterLayout = function (document, cardId) {
  const unoCard = document.createElement('div');
  unoCard.id = cardId;
  unoCard.className = 'uno-card theme-uno-card';
  return unoCard;
};

const createInnerText = function (document, className, text, addContent) {
  let outerText = document.createElement('div');
  outerText.className = className;
  outerText = addContent(document, outerText, text);
  return outerText;
};

const createInnerLayout = function (document, color) {
  const cardInner = document.createElement('div');
  cardInner.className = `theme-uno-card-inner ${color} `;
  return cardInner;
};

const createInnerDesign = function (document, color = 'white') {
  const designInner = document.createElement('div');
  designInner.className = `theme-uno-design-inner ${color} wild`;
  return designInner;
};

const createInnerSpan = function (document, className, text, addContent) {
  let numberSpan = document.createElement('div');
  numberSpan.className = className;
  numberSpan = addContent(document, numberSpan, text);
  return numberSpan;
};

const createReverseSymbol = function (document, parentDiv, symbol) {
  const reverseDiv = parentDiv;
  reverseDiv.classList.add('reverse');

  const reverse_left = document.createElement('span');
  reverse_left.className = 'reverse-left';
  reverse_left.innerHTML = symbol;

  const reverse_right = document.createElement('span');
  reverse_right.className = 'reverse-right';
  reverse_right.innerHTML = symbol;

  reverseDiv.appendChild(reverse_left);
  reverseDiv.appendChild(reverse_right);
  return reverseDiv;
};

const createWildCard = function (document, parentDiv) {
  parentDiv.classList.add('wild');
  const wildUp = document.createElement('span');
  wildUp.className = 'wild-up';

  const wildDown = document.createElement('span');
  wildDown.className = 'wild-down';
  parentDiv.appendChild(wildUp);
  parentDiv.appendChild(wildDown);

  return parentDiv;

};

const addHtmlContent = function (document, parentDiv, content) {
  parentDiv.innerHTML = content;
  return parentDiv;
};

const appendHtmlContent = function (document, parentDiv, content) {
  parentDiv = createReverseSymbol(document, parentDiv, content);
  return parentDiv;
};

const appendWildCard = function (document, parentDiv, content) {
  parentDiv = createWildCard(document, parentDiv);
  return parentDiv;
};

const createInnerEllipse = function (document, card, spanClass, addContent) {

  let designInner = createInnerDesign(document);
  if (card.isWildCard) {
    designInner.classList.add(spanClass);
    designInner = appendWildCard(document, designInner);

    return designInner;
  }

  const design = createInnerSpan(
    document,
    spanClass,
    card.symbol,
    addContent
  );
  designInner.appendChild(design);
  return designInner;
};


const createUnoCard = function (document, card, cardId, innerColor, spanClass) {
  let addContent = addHtmlContent;

  if (card.isReverseCard) {
    addContent = appendHtmlContent;
  }


  const unoCard = createOuterLayout(document, cardId);

  const cardInner = createInnerLayout(document, innerColor);

  const numberLeft = createInnerText(
    document,
    'number-left',
    card.symbol,
    addContent
  );

  const numberSpan = createInnerEllipse(document, card, spanClass, addContent);

  const numberRight = createInnerText(
    document,
    'number-right',
    card.symbol,
    addContent
  );

  cardInner.appendChild(numberSpan);
  unoCard.appendChild(numberLeft);
  unoCard.appendChild(cardInner);
  unoCard.appendChild(numberRight);

  return unoCard;
};

const createPlayerCard = function (document, playerName) {
  const unoCard = document.createElement('div');
  unoCard.className = 'lobby-uno-card theme-uno-card';

  const cardInner = createInnerLayout(document, 'black');

  const designInner = createInnerDesign(document, 'red');

  const nameSpan = createInnerSpan(
    document,
    'theme-color',
    playerName,
    addHtmlContent
  );

  if (!playerName) {
    nameSpan.innerText = '';
    nameSpan.className = 'loader';
  }

  designInner.appendChild(nameSpan);
  cardInner.appendChild(designInner);
  unoCard.appendChild(cardInner);

  return unoCard;
};
