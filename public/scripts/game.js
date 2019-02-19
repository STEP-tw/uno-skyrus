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

const initializeHand = function(document, cards) {
  const hand = document.getElementById('myHand');
  cards.forEach(card => {
    hand.append(createCard(document, card));
  });
};

const fetchCards = function(document) {
  fetch('/playerCards')
    .then(response => response.json())
    .then(cards => {
      initializeHand(document, cards);
    });
};

const initialize = function(document) {
  initializePile(document);
  fetchCards(document);
};

window.onload = initialize.bind(null, document);
