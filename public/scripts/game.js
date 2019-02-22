/* globals createCard */
/*eslint no-unused-vars: "off"*/
const OTHERS_CARDS_LIMIT = 3;

const drawCard = function(document) {
  fetch('/drawCard')
    .then(response => {
      return response.json();
    })
    .then(cardDetails => {
      initializeHand(document, cardDetails);
    });
};

const initializePile = function(document) {
  const pile = document.getElementById('pile');
  fetch('/pile')
    .then(response => {
      console.log(typeof response.status, response.status);
      return response.json();
    })
    .then(card => {
      pile.innerHTML = '';
      pile.append(createCard(document, card));
    });
};

const isSimilarCards = function(card1, card2) {
  return card1.number == card2.number && card1.color == card2.color;
};

const hasCard = (playableCards, card) => {
  return playableCards.some(playableCard => {
    return isSimilarCards(playableCard, card);
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
    drawCard(document);
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
  }).then(() => {
    console.log('in throwcard');
    fetchCards(document);
  });
};

const hideCards = function(hand, cardsCount) {
  let cardsToHide = cardsCount;
  for (let count = OTHERS_CARDS_LIMIT - 1; count >= 0; count--) {
    let visibility = 'visible';
    if (cardsToHide > 0) {
      visibility = 'hidden';
    }
    hand[count].style.visibility = visibility;
    cardsToHide--;
  }
};

const updateOthersCards = function(document, id, cardsCount) {
  const hand = document.getElementById(`player${id}Hand`).children;
  if (cardsCount <= OTHERS_CARDS_LIMIT) {
    const cardsToHide = OTHERS_CARDS_LIMIT - cardsCount;
    hideCards(hand, cardsToHide);
  }
};

const getNamesInOrder = function(playerNames, playerPosition) {
  const namesBeforeMe = playerNames.slice(0, playerPosition);
  const namesAfterMe = playerNames.slice(playerPosition);
  const detailsInOrder = namesAfterMe.concat(namesBeforeMe);
  return detailsInOrder;
};

const updateNamesAndClasses = function(document, id, name, isCurrent) {
  document.getElementById(`player${id}`).innerText = name;
  let className = 'non-current-player';
  if (isCurrent) {
    className = 'current-player';
  }
  document.getElementById(`player${id}-arrow`).className = className;
};

const updatePlayersDetails = function(document, playerDetails, playerPosition) {
  const detailsInOrder = getNamesInOrder(playerDetails, playerPosition);
  let id = 1;
  detailsInOrder.forEach(({ name, isCurrent, cardsCount }) => {
    updateNamesAndClasses(document, id, name, isCurrent);

    if (id !== 1) {
      updateOthersCards(document, id, cardsCount);
    }
    id++;
  });
};

const getPlayerDetails = document => {
  fetch('/getPlayerNames')
    .then(response => response.json())
    .then(players => {
      const { playerDetails, playerPosition } = players;
      updatePlayersDetails(document, playerDetails, playerPosition);
    });
};

const initialize = function(document) {
  setInterval(() => {
    initializePile(document);
    getLog(document);
    fetchCards(document);

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
    getPlayerDetails(document);
  }, 1000);
};
window.onload = initialize.bind(null, document);
