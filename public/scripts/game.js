/* globals createCard */
/*eslint no-unused-vars: "off"*/

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
  fetch('/serveLog')
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
  console.log(event.target.id, 'ondrag');
  event.dataTransfer.setData('text', event.target.id);
};

const drop = function(event) {
  event.preventDefault();

  const cardId = event.dataTransfer.getData('text');
  throwCard(document, cardId);
  console.log(onclick, ondrop);
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

const getNamesInOrder = function(playerNames, playerPosition) {
  const namesBeforeMe = playerNames.slice(0, playerPosition);
  const namesAfterMe = playerNames.slice(playerPosition);
  const namesInOrder = namesAfterMe.concat(namesBeforeMe);
  return namesInOrder;
};

const assignNames = function(document, playerNames, playerPosition) {
  const namesInOrder = getNamesInOrder(playerNames, playerPosition);
  let id = 1;
  namesInOrder.forEach(name => {
    document.getElementById(`player${id}`).innerText = name;
    id++;
  });
};

const getPlayerNames = document => {
  fetch('/getPlayerNames')
    .then(response => response.json())
    .then(players => {
      const { playerNames, playerPosition } = players;
      assignNames(document, playerNames, playerPosition);
    });
};

const initialize = function(document) {
  setInterval(() => {
    initializePile(document);
    fetchCards(document);
    getLog(document);
    const pile = document.getElementById('pile');
    pile.setAttribute('ondrop', 'drop(event)');
    pile.setAttribute('ondragover', 'allowDrop(event)');
  }, 1000);
  getPlayerNames(document);
};
window.onload = initialize.bind(null, document);
