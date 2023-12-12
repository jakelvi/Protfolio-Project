// Define an array of card suits (♠, ♣, ♥, ♦)
const SUITS = ["♠", "♣", "♥", "♦"]

// Define an array of card values (A, 2, 3, ..., 10, J, Q, K)
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]

// Export a class named 'Deck'
export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
  }

  // Getter method to retrieve the number of cards in the deck
  get numberOfCards() {
    return this.cards.length
  }

  // Removes and returns the top card from the deck
  pop() {
    return this.cards.shift()
  }

  // Adds a card to the bottom of the deck
  push(card) {
    this.cards.push(card)
  }

  // Shuffles the deck using the Fisher-Yates algorithm
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }
}

// Define a class named 'Card'
class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  // Determines the color of the card based on its suit
  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
  }

  // Generates an HTML representation of the card
  getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

// Function to create a fresh deck of cards with all combinations of suits and values
const freshDeck = ()  => {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}
