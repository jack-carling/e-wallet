<template>
  <div id="app">
    <router-view  :cards="cards"
                  :current="currentCard"
                  @update-card="setCurrentCard"
                  @add-card="addCard"
                  @delete-card="deleteCard">
    </router-view>
  </div>
</template>

<script>
import { saveAllData, getAllData } from './services/localStorage.js'

export default {
  name: 'App',
  data() {
    return {
      cards: [],
      currentCard: null
    }
  },
  methods: {
    setCurrentCard(id) { // Replace current card with card from array, and push replaced back
      if (this.currentCard) {
        const replace = this.currentCard;
        const newCurrent = this.cards.find(card => card.id === id);
        const newCurrentIndex = this.cards.findIndex(card => card.id === id);
        this.cards.splice(newCurrentIndex, 1);
        this.currentCard = newCurrent;
        this.cards.push(replace);
      } else {
        this.currentCard = this.cards[0];
        this.cards = [];
      }
      saveAllData(this.cards, this.currentCard);
    },
    addCard(card) {
      let newId;
      let newCard;
      if (this.currentCard) { // Generate new ID based on the last highest number
        newId = Math.max.apply(Math, this.cards.map(num => num.id));
        newId = Math.max(newId, this.currentCard.id) + 1;
      } else {
        newId = 0;
      }
      newCard = card;
      newCard.id = newId;
      this.cards.push(newCard);
      this.setCurrentCard(newId);
    },
    deleteCard() {
      if (this.cards.length > 0) {
        this.currentCard = this.cards[0];
        this.cards.splice(0, 1);
      } else {
        this.currentCard = null;
      }
      saveAllData(this.cards, this.currentCard);
    }
  },
  mounted() { // Load if any data from Local Storage
    const data = getAllData();
    this.currentCard = data.currentCard;
    this.cards = data.allCards;
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=PT+Mono&family=Source+Sans+Pro:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
*, *::before, *::after {
  box-sizing: border-box;
}
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  justify-content: center;
}
button {
  margin: 2rem 0;
  width: 100%;
  font-family: 'PT Mono', monospace;
  font-size: 1.2rem;
  padding: 1rem;
  border: 0;
  outline: 0;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
}
button.black {
  background-color: #000;
  color: #FFF;
}
button.white {
  background-color: #FFF;
  color: #000;
}
.card {
  user-select: none; /* Prevent user from selecting any elements in the cards */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 414px;
  display: flex;
}
@media only screen and (max-width: 414px) {
  #app {
    width: 100vw;
  }
}
</style>
