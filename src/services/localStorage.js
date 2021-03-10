export function saveAllData(cards, card) {
  const allCards = JSON.stringify(cards);
  const currentCard = JSON.stringify(card);
  window.localStorage.setItem('allCards', allCards);
  window.localStorage.setItem('currentCard', currentCard);
}

export function getAllData() {
  let allCards = window.localStorage.getItem('allCards');
  let currentCard = window.localStorage.getItem('currentCard');
  allCards = JSON.parse(allCards);
  currentCard = JSON.parse(currentCard);
  if (allCards === null) {
    allCards = [];
  }
  const data = { allCards, currentCard };
  return data;
}