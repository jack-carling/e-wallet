<template>
<section>
  <transition-group name="stack">
  <Card v-for="(card, index) in cards"
        :key="card.id"
        :vendor="card.vendor"
        :number="card.number"
        :name="card.name"
        :valid="card.valid"
        class="card"
        @click.native="getCard(card.id)"
        :style="{top: ((index * 2) + 'rem') }" />
  </transition-group>
</section>
</template>

<script>
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  props: {
    cards: Array
  },
  methods: {
    getCard(id) {
      this.$emit('update-card', id);
    }
  }
}
</script>

<style scoped>
section {
  position: relative;
}
.card {
  position: absolute;
  top: 0;
  left: 0;
}
.stack-enter-active, .stack-leave-active {
  transition: all 0.5s;
}
.stack-enter {
  transform: translateY(2rem);
}
.stack-leave-to {
  opacity: 0;
}
</style>