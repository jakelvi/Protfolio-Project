import Deck from "./warCard.js";

// Mapping of card values to their corresponding numerical values
const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

// DOM elements for various components of the game
const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

// Modify the handleWar function to handle multiple rounds of war
const handleWar = () => {
  text.innerText = "War!";
  // Check if there are enough cards for a war
  if (playerDeck.numberOfCards < 4 || computerDeck.numberOfCards < 4) {
    text.innerText = "Not enough cards for War!";
    return;
  }

  // Retrieve 4 cards from each player for the war
  const playerWarCards = [
    playerDeck.pop(),
    playerDeck.pop(),
    playerDeck.pop(),
    playerDeck.pop(),
  ];
  const computerWarCards = [
    computerDeck.pop(),
    computerDeck.pop(),
    computerDeck.pop(),
    computerDeck.pop(),
  ];

  // Display the war cards on the game board
  playerWarCards.forEach((card) => playerCardSlot.appendChild(card.getHTML()));
  computerWarCards.forEach((card) =>
    computerCardSlot.appendChild(card.getHTML())
  );

  // Compare the last cards drawn for the war
  const playerWarCard = playerWarCards[playerWarCards.length - 1];
  const computerWarCard = computerWarCards[computerWarCards.length - 1];

  if (isRoundWinner(playerWarCard, computerWarCard)) {
    text.innerText = "You win the War!";
    playerDeck.push(...playerWarCards, ...computerWarCards);
  } else {
    text.innerText = "You lose the War!";
    computerDeck.push(...playerWarCards, ...computerWarCards);
  }

  updateDeckCount();
};

let playerDeck, computerDeck, inRound, stop;

// Function to start a new game
const startGame = () => {
  const deck = new Deck();
  deck.shuffle();

  // Split the deck into two parts for player and computer
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));

  // Initialize game state variables
  inRound = false;
  stop = false;

  // Clean up the game elements before starting a new round
  cleanBeforeRound();
};

// Function to reset the game state before a new round
const cleanBeforeRound = () => {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";

  // Update the displayed deck counts
  updateDeckCount();
};

// Function to flip the cards and determine the round winner
const flipCards = () => {
  inRound = true;

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  // Display the flipped cards on the game board
  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  // Update the displayed deck counts
  updateDeckCount();

  // Determine the winner of the round and update game state accordingly
  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = "War is unresolved. Another War begins...";
    // Call the handleWar function when there's a tie
    handleWar();
  }

  // Check if the game is over and update game state accordingly
  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!";
    stop = true;
  }
};

// Function to update the displayed deck counts
const updateDeckCount = () => {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
};

// Function to determine the winner of a round
const isRoundWinner = (cardOne, cardTwo) => {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
};

// Function to check if a deck is empty (game over)
const isGameOver = (deck) => {
  return deck.numberOfCards === 0;
};

// Start the game when the script is loaded
startGame();

// Event listener for clicks (starts a new game or advances the current round)
document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});
