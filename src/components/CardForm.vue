<template>
<section>
  <label class="first" for="number">CARD NUMBER</label>
  <input type="text" id="number" v-mask="'#### #### #### ####'" v-model="number" placeholder="XXXX XXXX XXXX XXXX" inputmode="numeric">
  <span class="error" v-if="error.number"><i class="material-icons">error</i>{{ error.number }}</span>
  <label for="name">CARDHOLDER NAME</label>
  <input type="text" id="name" placeholder="FIRSTNAME LASTNAME" v-model="name" autocomplete="off">
  <span class="error" v-if="error.name"><i class="material-icons">error</i>{{ error.name }}</span>
  <article>
    <label for="valid">VALID THRU</label>
    <label for="cvc">CVC</label>
    <input type="text" id="valid" v-mask="'##/##'" v-model="valid" placeholder="MM/YY" inputmode="numeric">
    <input type="text" id="cvc" v-mask="'###'" v-model="cvc" placeholder="XXX" inputmode="numeric">
    <span class="error valid" v-if="error.valid"><i class="material-icons">error</i>{{ error.valid }}</span>
    <span class="error cvc" v-if="error.cvc"><i class="material-icons">error</i>{{ error.cvc }}</span>
  </article>
  <label for="vendor">VENDOR</label>
  <div>
  <select id="vendor" v-model="vendor">
    <option value="blank" selected disabled>SELECT VENDOR</option>
    <option value="bitcoin">BITCOIN INC</option>
    <option value="ninja">NINJA BANK</option>
    <option value="blockchain">BLOCK CHAIN INC</option>
    <option value="evil">EVIL CORP</option>
  </select>
  <i class="material-icons select">keyboard_arrow_down</i>
  </div>
  <span class="error" v-if="error.vendor"><i class="material-icons">error</i>{{ error.vendor }}</span>
  <button class="black" @click="addCard">ADD CARD</button>
</section>
</template>

<script>
import { validate } from '../services/date.js'

export default {
  data() {
    return {
      number: '',
      name: '',
      valid: '',
      cvc: '',
      vendor: 'blank',
      error: {
        number: '',
        name: '',
        valid: '',
        cvc: '',
        vendor: ''
        }
    }
  },
  watch: {
    number() { // Validate 16 digits (19 = 16 digits + 3 spaces)
      this.$emit('card-number', this.number);
      if (this.number.length === 19) {
        this.error.number = '';
      }
    },
    name() { // Validate only letters, not empty and not longer than 25 characters
      const regex = new RegExp('^[a-zåäö A-ZÅÄÖ]+$');
      if (!regex.test(this.name)) {
        if (this.name.length === 0) {
          this.error.name = 'Input cannot be empty';
        } else {
          this.error.name = 'Input can only contain letters';
        }
      } else if (this.name.length >= 25) {
        this.error.name = 'Input is too long';
      } else {
        this.error.name = '';
      }
      this.$emit('card-name', this.name);
    },
    valid() { // Validate 4 digits with slash (5 = XX/XX)
      this.$emit('card-valid', this.valid);
      if (this.valid.length === 5) {
        this.error.valid = validate(this.valid);
      } else {
        this.error.valid = '';
      }
    },
    cvc() { // Validate 3 digits
      if (this.cvc.length === 3) {
        this.error.cvc = '';
      }
    },
    vendor() { // Validate vendor is not default which is none selected
      this.$emit('card-vendor', this.vendor);
      if (this.vendor !== 'blank') {
        this.error.vendor = '';
      }
    }
  },
  methods: {
    addCard() { // Validate all input fields on click and check for no errors
      if (this.number.length !== 19) {
        this.error.number = 'Input must be 16 digits';
      }
      if (this.name.length === 0) {
        this.error.name = 'Input cannot be empty';
      }
      if (this.valid.length !== 5) {
        this.error.valid = 'Missing digits';
      }
      if (this.cvc.length !== 3) {
        this.error.cvc = 'Missing digits';
      }
      if (this.vendor === 'blank') {
        this.error.vendor = 'Please select a vendor'
      }
      const allErrors = Object.values(this.error);
      const allEmpty = allErrors.every(error => error === '');
      if (allEmpty) {
        const newCard = {
          number: this.number,
          name: this.name,
          valid: this.valid,
          cvc: this.cvc,
          vendor: this.vendor
        }
        this.$emit('add-card', newCard);
      }
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}
article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}
input {
  width: 100%;
  color: #000;
  border: 1px solid #000;
  outline: 0;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'PT Mono', monospace;
  font-size: 1rem;
}
label {
  font-family: 'PT Mono', monospace;
  font-size: 0.8rem;
}
label:not(.first) {
  margin-top: 1rem;
}
span.error {
  color: #FF0033;
  display: flex;
  align-items: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 0.9rem;
  margin-top: 0.2rem;
}
span.error i {
  margin-right: 0.2rem;
}
span.error.valid {
  grid-column: 1 / 2;
}
span.error.cvc {
  grid-column: 2 / 3;
}
select {
  font-family: 'PT Mono', monospace;
  font-size: 1rem;
  padding: 1rem;
  border: 0;
  outline: 0;
  width: 100%;
  border: 1px solid #000;
  border-radius: 8px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
div {
  position: relative;
}
i.select {
  position: absolute;
  font-size: 24px;
  height: 24px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 1rem;
  pointer-events: none;
}
</style>