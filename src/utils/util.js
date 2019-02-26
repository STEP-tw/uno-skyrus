const generateGameKey = () => {
  return Date.now();
};

const modifySymbol = function(card) {
  const symbols = { skip: '&#8856;', '+2': '+2', '&#8856;': '&#8856;'};
  if (card.symbol) card.symbol = symbols[card.symbol];
  return card;
};

const modifySymbols = function(cards) {
  return cards.map(modifySymbol);
};

module.exports = { generateGameKey, modifySymbol, modifySymbols };
