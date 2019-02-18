class Card {
  constructor() {}
}

class NumberedCard extends Card {
  constructor(number, color) {
    super();
    this.number = number;
    this.color = color;
  }
}

module.exports = { NumberedCard };
