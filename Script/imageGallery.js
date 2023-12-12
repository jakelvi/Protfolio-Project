const gamesCarousel = document.querySelector("#carousel");
const firstGameCardWidth = gamesCarousel.querySelector(".card1").offsetWidth;
const gameArrowBtns = document.querySelectorAll("#games .wrapper i");
const gamesCarouselChildrens = [...gamesCarousel.children];

let isGameDragging = false,
  startGameX,
  startGameScrollLeft,
  gameTimeoutId;

// Get the number of cards that can fit in the gamesCarousel at once
let gameCardsPerView = Math.round(
  gamesCarousel.offsetWidth / firstGameCardWidth
);

// Insert copies of the last few game cards to beginning of gamesCarousel for infinite scrolling
gamesCarouselChildrens
  .slice(-gameCardsPerView)
  .reverse()
  .forEach((gameCard) => {
    gamesCarousel.insertAdjacentHTML("afterbegin", gameCard.outerHTML);
  });

// Insert copies of the first few game cards to end of gamesCarousel for infinite scrolling
gamesCarouselChildrens.slice(0, gameCardsPerView).forEach((gameCard) => {
  gamesCarousel.insertAdjacentHTML("beforeend", gameCard.outerHTML);
});

// Scroll the gamesCarousel at appropriate postition to hide first few duplicate game cards on Firefox
gamesCarousel.classList.add("no-transition");
gamesCarousel.scrollLeft = gamesCarousel.offsetWidth;
gamesCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the gamesCarousel left and right
gameArrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    gamesCarousel.scrollLeft +=
      btn.id == "left1" ? -firstGameCardWidth : firstGameCardWidth;
  });
});

const gameDragStart = (e) => {
  isGameDragging = true;
  gamesCarousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the gamesCarousel
  startGameX = e.pageX;
  startGameScrollLeft = gamesCarousel.scrollLeft;
};

const gameDragging = (e) => {
  if (!isGameDragging) return; // if isGameDragging is false return from here
  // Updates the scroll position of the gamesCarousel based on the cursor movement
  gamesCarousel.scrollLeft = startGameScrollLeft - (e.pageX - startGameX);
};

const gameDragStop = () => {
  isGameDragging = false;
  gamesCarousel.classList.remove("dragging");
};

const gameInfiniteScroll = () => {
  // If the gamesCarousel is at the beginning, scroll to the end
  if (gamesCarousel.scrollLeft === 0) {
    gamesCarousel.classList.add("no-transition");
    gamesCarousel.scrollLeft =
      gamesCarousel.scrollWidth - 2 * gamesCarousel.offsetWidth;
    gamesCarousel.classList.remove("no-transition");
  }
  // If the gamesCarousel is at the end, scroll to the beginning
  else if (
    Math.ceil(gamesCarousel.scrollLeft) ===
    gamesCarousel.scrollWidth - gamesCarousel.offsetWidth
  ) {
    gamesCarousel.classList.add("no-transition");
    gamesCarousel.scrollLeft = gamesCarousel.offsetWidth;
    gamesCarousel.classList.remove("no-transition");
  }

  // Clear existing timeout
  clearTimeout(gameTimeoutId);
};

gamesCarousel.addEventListener("mousedown", gameDragStart);
gamesCarousel.addEventListener("mousemove", gameDragging);
document.addEventListener("mouseup", gameDragStop);
gamesCarousel.addEventListener("scroll", gameInfiniteScroll);
