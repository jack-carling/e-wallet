<template>
<section>
  <h1>{{ header }}</h1>
  <span>{{ text }}</span>
</section>
</template>

<script>
export default {
  props: {
    header: String,
    text: String
  }
}
</script>

<style scoped>
section {
  text-align: center;
  font-family: 'Source Sans Pro', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-weight: 700;
  font-size: 2rem;
  width: 75%;
  margin: 0;
  padding: 1rem 2rem 2rem 2rem;
  color: #222222;
}
span {
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  color: rgba(34, 34, 34, 0.6);
  display: block;
}
@media only screen and (max-width: 335px) {
  h1 {
    width: 100%;
  }
}
</style>