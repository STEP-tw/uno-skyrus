/* globals createCard */
/*eslint no-unused-vars: "off"*/

const drawCard = function() {
  fetch('/drawCard');
};

const initializePile = function(document) {
  const pile = document.getElementById('pile');
  fetch('/pile')
    .then(response => response.json())
    .then(card => {
      pile.innerHTML = '';
      pile.append(createCard(document, card));
    });
};

const hasCard = (playableCards, card) => {
  return playableCards.some(playableCard => {
    return (
      playableCard.number == card.number && playableCard.color == card.color
    );
  });
};

const displayLog = function(document, log) {
  const status = document.getElementById('statusBar');
  status.innerHTML = log;
};

const getLog = function(document) {
  fetch('/gameLog')
    .then(response => response.text())
    .then(log => displayLog(document, log));
};

const initializeHand = function(document, { cards, playableCards }) {
  const hand = document.getElementById('myHand');
  hand.innerHTML = '';
  cards.forEach((card, index) => {
    const cardView = createCard(document, card);
    let className = 'non-playable-card';
    if (hasCard(playableCards, card)) {
      cardView.setAttribute('draggable', 'true');
      cardView.setAttribute('ondragstart', 'drag(event)');
      cardView.id = index;
      className = 'highlight-playable-card';
    }
    cardView.classList.add(className);
    hand.append(cardView);
  });
};

const allowDrop = function(event) {
  event.preventDefault();
};

const drag = function(event) {
  event.dataTransfer.setData('text', event.target.id);
};

const drop = function(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text');

  throwCard(document, cardId);
};

const drawDrop = function(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text');
  if (cardId == 'stack') {
    drawCard();
  }
};

const fetchCards = function(document) {
  fetch('/playerCards')
    .then(response => response.json())
    .then(cards => {
      initializeHand(document, cards);
    });
};

const throwCard = function(document, cardId) {
  fetch('/throwCard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cardId })
  });
};

const hideCards = function(hand, cardsCount) {
  let visibility;
  for (let count = 2; count >= 0; count--) {
    visibility = 'visible';
    if (cardsCount > 0) {
      visibility = 'hidden';
      console.log('inside if condition with count value', count);
    }
    hand[count].style.visibility = visibility;
    cardsCount = cardsCount - 1;
  }
};

const updateOthersCards = function(playerId, cardsCount) {
  const cardLimit = 3;
  const hand = document.getElementById(`player${playerId}Hand`).children;
  if (cardsCount <= cardLimit) {
    hideCards(hand, cardLimit - cardsCount);
  }
};

const getNamesInOrder = function(playerNames, playerPosition) {
  const namesBeforeMe = playerNames.slice(0, playerPosition);
  const namesAfterMe = playerNames.slice(playerPosition);
  const detailsInOrder = namesAfterMe.concat(namesBeforeMe);
  return detailsInOrder;
};

const assignNames = function(document, playerDetails, playerPosition) {
  const detailsInOrder = getNamesInOrder(playerDetails, playerPosition);
  let id = 1;
  detailsInOrder.forEach(({ name, isCurrent, cardsCount }) => {
    document.getElementById(`player${id}`).innerText = name;
    let className = 'non-current-player';
    if (isCurrent) {
      className = 'current-player';
    }
    document.getElementById(`player${id}-arrow`).className = className;
    if (id !== 1) {
      updateOthersCards(id, cardsCount);
    }
    id++;
  });
};

const getPlayerNames = document => {
  fetch('/getPlayerNames')
    .then(response => response.json())
    .then(players => {
      const { playerDetails, playerPosition } = players;
      assignNames(document, playerDetails, playerPosition);
    });
};

const initialize = function(document) {
  setInterval(() => {
    initializePile(document);
    fetchCards(document);
    getLog(document);
    const pile = document.getElementById('pile');
    pile.setAttribute('ondrop', 'drop(event)');

    const stack = document.getElementById('stack');
    stack.setAttribute('draggable', 'true');
    stack.setAttribute('ondragstart', 'drag(event)');

    const hand = document.getElementById('myHand');
    hand.setAttribute('ondragover', 'allowDrop(event)');
    hand.setAttribute('ondrop', 'drawDrop(event)');

    pile.setAttribute('ondrop', 'drop(event)');
    pile.setAttribute('ondragover', 'allowDrop(event)');
    getPlayerNames(document);
  }, 1000);
};
window.onload = initialize.bind(null, document);
