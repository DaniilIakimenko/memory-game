const images = [
  'assets/images/gul\'dan.webp',
  'assets/images/illidan.webp',
  'assets/images/jaina.webp',
  'assets/images/lich-king.webp',
  'assets/images/malfurion.webp',
  'assets/images/sylvanas.webp',
  'assets/images/thrall.webp',
  'assets/images/vol\'jin.webp'
];

let firstCard = null;
let secondCard = null;
let moves = 0;
let pairs = 0;
let lock = false;
let timer = null;

/* --- App --- */
const app = createElem('div', ['app']);

/* --- Header --- */
const header = createElem('header', ['header']);

const headerTitle = createElem('h1', ['header__title']);
headerTitle.textContent = 'Memory Game';

const headerActions = createElem('div', ['header__actions']);

const newGameBtn = createElem('button', ['btn', 'btn--primary']);
newGameBtn.type = 'button';
newGameBtn.textContent = 'New Game';
newGameBtn.onclick = startGame;

const leaderboardBtn = createElem('button', ['btn', 'btn--ghost']);
leaderboardBtn.type = 'button';
leaderboardBtn.textContent = 'Leaderboard';

headerActions.append(newGameBtn, leaderboardBtn);
header.append(headerTitle, headerActions);

/* --- Stats --- */
const stats = createElem('div', ['stats']);
const movesItem = createElem('div', ['stats__item']);

const movesLabel = createElem('span', ['stats__label']);
movesLabel.textContent = 'Moves';

const movesValue = createElem('span', ['stats__value']);
movesValue.textContent = '0';

movesItem.append(movesLabel, movesValue);

const pairsItem = createElem('div', ['stats__item']);

const pairsLabel = createElem('span', ['stats__label']);
pairsLabel.textContent = 'Pairs';

const pairsValue = createElem('span', ['stats__value']);
pairsValue.textContent = '0 / 8';

pairsItem.append(pairsLabel, pairsValue);
stats.append(movesItem, pairsItem);

/* --- Board --- */
const board = createElem('div', ['board']);

/* --- Win Modal --- */
const winModal = createModal();
winModal.modalTitle.textContent = 'Congratulations!'

const modalNewGameBtn = createButton('New Game', startGame);
modalNewGameBtn.classList.add('btn--primary');

winModal.modalActions.append(modalNewGameBtn);


const leaderBoardModal = createModal();

app.append(header, stats, board, winModal.modal, leaderBoardModal.modal);
document.body.append(app);

function createElem(tag, classes=[]) {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  return el;
}

function createButton(text, onClick) {
  const btn = createElem('button', ['btn']);

  btn.type = 'button';
  btn.textContent = text;
  btn.onclick = onClick;

  return btn;
}

function createCard(path) {
  const card = createElem('button', ['card']);
  card.type = 'button';
  card.dataset.img = path;
  card.onclick = flipCard;

  const cardInner = createElem('span', ['card__inner']);
  card.append(cardInner);

  const cardFace = createElem('span', ['card__face', 'card__face--front']);
  const cardBack = createElem('span', ['card__face', 'card__face--back']);
  cardInner.append(cardFace, cardBack);

  const cardImg = createElem('img', ['card__img']);
  cardImg.src = path;
  cardBack.append(cardImg);

  return card;
}

function createModal() {
  const modal = createElem('dialog', ['modal']);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  const modalInner = createElem('div', ['modal__inner']);

  const modalCloseBtn = createElem('button', ['modal__close']);
  modalCloseBtn.type = 'button';
  modalCloseBtn.textContent = '×';
  modalCloseBtn.onclick = () => modal.close();

  const modalTitle = createElem('h2', ['modal__title']);
  const modalBody = createElem('div', ['modal__body']);
  const modalActions = createElem('div', ['modal__actions']);

  modalInner.append(modalCloseBtn, modalTitle, modalBody, modalActions);
  modal.append(modalInner);

  return { modal, modalTitle, modalBody, modalActions, modalCloseBtn };
}

function shuffle(arr) {
  for (let i = (arr.length - 1); i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  return arr;
}

function flipCard() {
  if (lock) return;
  if (this.classList.contains('is-flipped') || this.classList.contains('is-matched')) return;

  this.classList.add('is-flipped');

  if (firstCard === null) {
    firstCard = this;
  } else {
    secondCard = this;
    moves++;

    if (firstCard.dataset.img === secondCard.dataset.img) {
      firstCard.classList.add('is-matched');
      secondCard.classList.add('is-matched');
      firstCard = null;
      secondCard = null;
      pairs++;

      updateStats(moves, pairs);

      if (pairs === 8) {
        winModal.modal.showModal();
        winModal.modalBody.textContent = `Moves: ${moves}`;
      }

    } else {
      lock = true;

      updateStats(moves, pairs);

      timer = setTimeout(() => {
        lock = false;
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        firstCard = null;
        secondCard = null;
        timer = null;
      }, 1000);
    }
  }
}

function updateStats() {
  movesValue.textContent = `${moves}`;
  pairsValue.textContent = `${pairs} / 8`;
}

function startGame() {
  if (winModal.modal.open) winModal.modal.close();

  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }

  moves = 0;
  pairs = 0;
  firstCard = null;
  secondCard = null;
  lock = false;

  updateStats();

  board.replaceChildren();

  const cardsImages = shuffle([...images, ...images]);

  cardsImages.forEach(path => {
    board.append(createCard(path));
  });
}

startGame();