class Card {
  constructor() {}
}

class NumberedCard extends Card {
  constructor(number, color) {
    super();
    this.number = number;
    this.color = color;
  }
  canPlayOnTopOf(otherCard) {
    return otherCard.number == this.number || otherCard.color == this.color;
  }
}

module.exports = { NumberedCard };
