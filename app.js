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

const app = createElem('div', ['app']);

/* --- Header --- */
const header = createElem('header', ['header']);

const headerTitle = createElem('h1', ['header__title']);
headerTitle.textContent = 'Memory Game';

const headerActions = createElem('div', ['header__actions']);

const newGameBtn = createElem('button', ['btn', 'btn--primary']);
newGameBtn.type = 'button';
newGameBtn.textContent = 'New Game';

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

const cardsImages = [...images, ...images];

cardsImages.forEach(path => {
  board.append(createCard(path));
})

app.append(header, stats, board);
document.body.append(app);

function createElem(tag, classes=[]) {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  return el;
}

function createCard(path) {
  const card = createElem('button', ['card']);
  card.dataset.img = path;

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