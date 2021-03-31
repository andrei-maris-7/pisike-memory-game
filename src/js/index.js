// SELECTORS

const cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector(".game__highlights--reset");
const newGameBtn = document.querySelector(".game__highlights--newGame");

const highlightsContainer = document.querySelector(".game__highlights");

// STATE

const state = {
  moves: 0,
  roundsPlayed: 0,
  bestScore: 0,
  matchingCounter: 0,
};

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// FUNCTIONS

const flipCard = function () {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click

  secondCard = this;
  checkMatch();
  checkWin();
};

const checkMatch = function () {
  if (firstCard.dataset.id === secondCard.dataset.id) {
    state.matchingCounter++;
    state.moves++;
    updateMarkup();
    disableCards();
  } else {
    state.moves++;
    updateMarkup();
    unflipCards();
  }
};

const checkWin = function () {
  if (state.matchingCounter !== 12) return;

  if (state.roundsPlayed === 0) {
    state.bestScore = state.moves;
  }

  if (state.roundsPlayed > 0) {
    state.moves < state.bestScore
      ? (state.bestScore = state.moves)
      : state.bestScore;
  }

  state.matchingCounter = 0;
  state.roundsPlayed++;

  updateMarkup();
};

const disableCards = function () {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
};

const unflipCards = function () {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
};

const resetBoard = function () {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

const shuffle = function () {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
};

const resetGame = function () {
  state.matchingCounter = 0;
  state.moves = 0;
  state.roundsPlayed = 0;
  state.bestScore = 0;

  cards.forEach((card) => card.classList.remove("flip"));
  resetBoard();
  cards.forEach((card) => card.addEventListener("click", flipCard));

  updateMarkup();
  shuffle();
};

const newGame = function () {
  state.matchingCounter = 0;
  state.moves = 0;

  cards.forEach((card) => card.classList.remove("flip"));
  resetBoard();
  cards.forEach((card) => card.addEventListener("click", flipCard));

  updateMarkup();
  shuffle();
};

shuffle();

// UI DISPLAY

const generateMarkup = function () {
  return `
    <div class="moves__container">
    <p class="game__highlights--moves">Moves</p>
    <p class="game__highlights--movesValue">${state.moves}</p>
  </div>
  
  <div class="rounds__container">
    <p class="game__highlights--rounds">Rounds played</p>
    <p class="game__highlights--roundsValue">${state.roundsPlayed}</p>
  </div>
  
  <div class="score__container">
    <p class="game__highlights--bestScore">Best Score</p>
    <p class="game__highlights--bestScoreValue">${state.bestScore}</p>
  </div>

  <p class="game__highlights--newGame">New Game</p>
  <p class="game__highlights--reset">Reset</p>

  `;
};

const updateMarkup = function () {
  const newMarkup = generateMarkup();

  const newDOM = document.createRange().createContextualFragment(newMarkup);

  const curElements = Array.from(highlightsContainer.querySelectorAll("*"));
  const newElements = Array.from(newDOM.querySelectorAll("*"));

  newElements.forEach((newEl, i) => {
    const curEl = curElements[i];

    // Updates changed TEXT

    if (
      !newEl.isEqualNode(curEl) &&
      newEl.firstChild?.nodeValue.trim() !== ""
    ) {
      curEl.textContent = newEl.textContent;
    }
  });
};

// EVENT LISTENERS

// Flip function

cards.forEach((card) => card.addEventListener("click", flipCard));

// RESET BUTTON

resetBtn.addEventListener("click", resetGame);

// NEW GAME BUTTON

newGameBtn.addEventListener("click", newGame);
