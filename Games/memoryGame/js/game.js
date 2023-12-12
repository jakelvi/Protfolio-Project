// Initialize variables
let errors = 0; // Counter for errors
const cardList = [ // List of card types
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
];

let cardSet; // Array to hold shuffled cards
let board = []; // 2D array representing the game board
const rows = 4; // Number of rows on the board
const columns = 5; // Number of columns on the board

let card1Selected; // Variable to hold the first selected card
let card2Selected; // Variable to hold the second selected card

document.addEventListener("DOMContentLoaded", () => {
    shuffleCards(); // When the DOM is loaded, shuffle cards and start the game
    startGame(); // Initialize the game
});

// Function to shuffle the cards
const shuffleCards = () => {
    cardSet = [...cardList, ...cardList]; // Duplicate the card list for matching pairs
    cardSet.sort(() => Math.random() - 0.5); // Shuffle the cards
};

// Function to start the game
const startGame = () => {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop(); // Get a card from the shuffled set
            row.push(cardImg); // Store card in row array

            let card = document.createElement("img"); // Create an image element
            card.id = `${r}-${c}`; // Set id for the card
            card.src = `${cardImg}.jpg`; // Set image source
            card.classList.add("card"); // Add class for styling
            card.addEventListener("click", selectCard); // Add click event listener
            document.getElementById("board").append(card); // Add card to the board
        }
        board.push(row); // Add row to the board
    }

    setTimeout(hideCards, 1000); // Hide the cards after 1 second
};

// Function to hide the cards (initial state)
const hideCards = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(`${r}-${c}`); // Get card element by id
            card.src = "back.jpg"; // Set card image to the back
        }
    }
};

// Function to handle card selection
const selectCard = function() {
    if (this.src.includes("back")) { // If the card is facing down
        if (!card1Selected) { // If no first card is selected
            card1Selected = this; // Set the first card
            let [r, c] = card1Selected.id.split("-").map(Number); // Get row and column
            card1Selected.src = `${board[r][c]}.jpg`; // Show the card face
        } else if (!card2Selected && this !== card1Selected) { // If second card is selected and it's not the same as the first
            card2Selected = this; // Set the second card
            let [r, c] = card2Selected.id.split("-").map(Number); // Get row and column
            card2Selected.src = `${board[r][c]}.jpg`; // Show the card face
            setTimeout(update, 1000); // Check for match after 1 second
        }
    }
};

// Function to update the game state after card selection
const update = () => {
    if (card1Selected.src !== card2Selected.src) { // If cards don't match
        card1Selected.src = "back.jpg"; // Flip the first card back
        card2Selected.src = "back.jpg"; // Flip the second card back
        errors += 1; // Increment error count
        document.getElementById("errors").innerText = errors; // Update error count display
    }

    card1Selected = null; // Reset first selected card
    card2Selected = null; // Reset second selected card
};
