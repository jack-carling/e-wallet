<template>
<main>
  <Top header="E-WALLET" :text="cardStatus" />
  <section class="active-card">
  <Card v-if="current"
        ref="card"
        class="card"
        :class="{shrink: isShrunk}"
        :vendor="current.vendor"
        :number="current.number"
        :name="current.name"
        :valid="current.valid"
        @click.native="isShrunk=!isShrunk" />
  <i class="material-icons" v-if="isShrunk" @click="deleteCard">clear</i>
  </section>
  <transition name="empty">
    <EmptyCard v-if="!current" />
  </transition>
  <CardStack  v-if="cards.length"
              :cards="cards"
              :style="{height: cardStackHeight}"
              @update-card="updateCard" />
  <button @click="$router.push('/add')" class="white">ADD A NEW CARD</button>
</main>
</template>

<script>
import Top from '../components/Top.vue'
import Card from '../components/Card.vue'
import CardStack from '../components/CardStack.vue'
import EmptyCard from '../components/EmptyCard.vue'

export default {
  components: {
    Top,
    Card,
    CardStack,
    EmptyCard
  },
  props: {
    cards: Array,
    current: Object
  },
  data() {
    return {
      cardHeight: 0,
      cardStackHeight: '',
      isShrunk: false
    }
  },
  computed: {
    numberOfCards() {
      return this.cards.length;
    },
    cardStatus() {
      if (this.current) {
        return 'ACTIVE CARD';
      } else {
        return 'NO CARDS SAVED';
      }
    }
  },
  methods: {
    calcCardHeight() {
      /*
      CardStack component has a section parent which only contains absolutely positioned children
      Therefore there is no height reference value which would place the button underneath
      Since the cards are responsive and not a fixed height they need to be measured
      Height also depends on number of cards in CardStack
      */
      this.cardHeight = this.$refs.card.$el.clientHeight;
      this.cardStackHeight = `calc(${this.cardHeight}px + ${this.numberOfCards - 1} * 2rem)`;
    },
    updateCard(payload) {
      this.$emit('update-card', payload);
    },
    deleteCard() {
      this.$emit('delete-card');
      this.calcCardHeight();
      this.isShrunk = false;
    }
  },
  updated() {
    if (this.current) { // Check if there's any card saved before calculating
      this.calcCardHeight();
    }
  },
  mounted() {
    if (this.current) { // Check if there's any card saved before calculating
      this.calcCardHeight();
    }
  },
  created() {
    document.title = 'E-wallet'
  }
}
</script>

<style>
main {
  width: 100%;
  padding: 1rem;
}
main .card {
  margin-bottom: 2rem;
  transform-origin: left;
  transition: all 0.5s ease;
  z-index: 1;
  cursor: pointer;
}
.shrink {
  transform: scale(0.85);
}
section.active-card {
  position: relative;
}
section.active-card i {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #222222;
  color: #FFF;
  cursor: pointer;
  display: grid;
  place-items: center;
}
section.active-card i:hover {
  opacity: 0.75;
}
.empty-enter-active {
  transition: all 0.5s;
  transform-origin: left;
}
.empty-enter {
  transform: scale(0.85);
}
</style>