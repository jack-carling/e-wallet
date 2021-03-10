<template>
<section>
  <i class="material-icons">check_circle_outline</i>
  <span>CARD ADDED SUCCESSFULLY</span>
  <button class="black" @click="$emit('add-another-card')">ADD ANOTHER CARD</button>
</section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
span {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 0.9rem;
  margin-top: 0.2rem;
}
i {
  color: #4BB543;
  font-size: 2rem;
}
</style>