/* globals createCard */

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

const initializeHand = function(document, { cards, playableCards }) {
  console.log(cards, playableCards);
  const hand = document.getElementById('myHand');
  cards.forEach((card, index) => {
    const cardView = createCard(document, card);
    let className = 'non-playable-card';
    if (hasCard(playableCards, card)) {
      cardView.onclick = throwCard.bind(null, document, index);
      className = 'highlight-playable-card';
    }
    cardView.classList.add(className);
    hand.append(cardView);
  });
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

const initialize = function(document) {
  initializePile(document);
  fetchCards(document);
};

window.onload = initialize.bind(null, document);
