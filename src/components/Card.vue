<template>
  <div :style="{background: background}">
    <img :src="chip" class="chip" alt="">
    <img :src="icon" class="icon" alt="">
    <span :style="{color: color}" class="number">{{ number }}</span>
    <article :style="{color: color}">
      <span class="info name">CARDHOLDER NAME</span>
      <span class="info valid">VALID THRU</span>
      <span class="data name">{{ nameUpperCase }}</span>
      <span class="data valid">{{ valid }}</span>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    vendor: String,
    number: String,
    name: String,
    valid: String
  },
  computed: {
    background() {
      if (this.vendor === 'bitcoin') {
        return `linear-gradient(248.04deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 99.07%), #FFAE34`;
      } else if (this.vendor === 'ninja') {
        return `linear-gradient(248.3deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), #222222`;
      } else if (this.vendor === 'blockchain') {
        return `linear-gradient(248.52deg, rgba(0, 0, 0, 0.15) 1.49%, rgba(0, 0, 0, 0) 100%), #8B58F9`;
      } else if (this.vendor === 'evil') {
        return `linear-gradient(248.3deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0) 100%), #F33355`;
      } else {
        return `linear-gradient(248.3deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%), #D0D0D0`;
      }
    },
    chip() {
      if (this.vendor === 'bitcoin' || this.vendor === 'blank') {
        return require('@/assets/chip-dark.svg');
      } else {
       return require('@/assets/chip-light.svg'); 
      }
    },
    icon() {
      if (this.vendor === 'bitcoin') {
        return require('@/assets/vendor-bitcoin.svg');
      } else if (this.vendor === 'ninja') {
        return require('@/assets/vendor-ninja.svg');
      } else if (this.vendor === 'blockchain') {
        return require('@/assets/vendor-blockchain.svg');
      } else if (this.vendor === 'evil') {
        return require('@/assets/vendor-evil.svg');
      } else {
        return ''
      }
    },
    color() {
      if (this.vendor === 'bitcoin' || this.vendor === 'blank') {
        return `#000000`;
      } else {
       return `#FFFFFF`; 
      }
    },
    nameUpperCase() {
      return this.name.toUpperCase();
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 0;
  padding-top: 63.05%;
  /* Credit card aspect ratio 1 / 1.586 = 63.05% */
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 8px;
}
div img.chip {
  position: absolute;
  max-height: 30%;
  top: 1rem;
  left: 1rem;
}
div img.icon {
  position: absolute;
  max-height: 25%;
  top: 1.5rem;
  right: 1.5rem;
}
div article {
  font-family: 'PT Mono', monospace;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
}
span.number {
  position: absolute;
  font-family: 'PT Mono', monospace;
  width: 100%;
  height: fit-content;
  text-align: center;
  top: 0;
  bottom: 0;
  margin: auto;
  font-size: 1.9rem;
  /* Responsive text and fallback */
  font-size: clamp(0.5rem, -0.2955rem + 8.4848vw, 1.9rem);
}
span.info {
  font-size: 0.7rem;
  /* Responsive text and fallback */
  font-size: clamp(0.3rem, 0.0727rem + 2.4242vw, 0.7rem);
}
span.info.name, span.data.name {
  margin-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
span.info.valid, span.data.valid {
  margin-right: 1rem;
  text-align: right;
}
span.data {
  font-size: 1rem;
  /* Responsive text and fallback */
  font-size: clamp(0.6rem, -0.0098rem + 3.9024vw, 1rem);
  margin-bottom: 1rem;
}
</style>