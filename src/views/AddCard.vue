<template>
<main>
  <Top header="ADD A NEW BANK CARD" text="NEW CARD" />
  <i class="material-icons back" @click="$router.push('/')">arrow_back</i>
  <Card ref="card"
        class="card"
        :number="number"
        :name="name"
        :valid="valid"
        :vendor="vendor" />
  <CardForm v-if="!complete"
            @card-number="updateCardNumber"
            @card-name="updateCardName"
            @card-valid="updateCardValid"
            @card-vendor="updateCardVendor"
            @add-card="addCard" />
  <CardFormComplete v-if="complete"
                    @add-another-card="addAnotherCard" />
</main>
</template>

<script>
import Top from '../components/Top.vue'
import Card from '../components/Card.vue'
import CardForm from '../components/CardForm.vue'
import CardFormComplete from '../components/CardFormComplete.vue'

export default {
  components: {
    Top,
    Card,
    CardForm,
    CardFormComplete
  },
  data() {
    return {
      number: 'XXXX XXXX XXXX XXXX',
      name: 'Firstname Lastname',
      valid: 'MM/YY',
      vendor: 'blank',
      complete: false
    }
  },
  created() {
    document.title = 'E-wallet • Add card'
  },
  methods: {
    updateCardNumber(number) {
      const allX = 'XXXX XXXX XXXX XXXX';
      const newX = allX.slice(number.length);
      this.number = number + newX;
    },
    updateCardName(name) {
      this.name = name;
    },
    updateCardValid(valid) {
      const allX = 'MM/YY';
      const newX = allX.slice(valid.length);
      this.valid = valid + newX;
    },
    updateCardVendor(vendor) {
      this.vendor = vendor;
    },
    addCard(payload) {
      this.$emit('add-card', payload);
      this.complete = true;
    },
    addAnotherCard() {
      this.number = 'XXXX XXXX XXXX XXXX';
      this.name = 'Firstname Lastname';
      this.valid = 'XX/XX';
      this.vendor = 'blank';
      this.complete = false;
    }
  }
}
</script>

<style>
i.back {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  display: grid;
  place-items: center;
}
</style>