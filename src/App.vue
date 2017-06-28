<template>
  <div id="app">
    <div
      @click="change"
    >
      <metal-canvas
        :text="price"
        :fontLoaded="fontLoaded"
        class="price"
        width="600px"
        height="140px"
      >
      </metal-canvas>
    </div>
    <div
      @click="change2"
    >
      <metal-canvas
        :text="action"
        :fontLoaded="fontLoaded"
        class="price"
        width="600px"
        height="140px"
      >
      </metal-canvas>
    </div>
    <range-slider
      v-model="exponent"
      :max="expoMax"
      :step="step"
    ></range-slider>
  </div>
</template>

<script>
import FontFaceObserver from 'fontfaceobserver'
import RangeSlider from '@/components/RangeSlider'
import MetalCanvas from '@/components/MetalCanvas'

const font = new FontFaceObserver('notobk-subset')
const base = 10000
const max = 5000000000000000
const baseList = '万億兆京垓'
const currencyList = '円㌦㌣㌷㍀㌠㌆㌵㌡㍓㍔'
// const actionList = ['欲しい！', '欲しくない！', 'あげる！']

export default {
  created () {
    font.load().then(() => {
      this.fontLoaded = true
    })
  },
  components: {
    RangeSlider,
    MetalCanvas
  },
  data () {
    return {
      currency: 0,
      action: '欲しい!',
      exponent: 1,
      expoMax: Math.log(max) / Math.log(base),
      fontLoaded: false,
      step: 0.00000001
    }
  },
  computed: {
    price () {
      return String(
        Math.floor(
          Math.ceil(
            Math.pow(base, this.exponent % 1) * base
          ) / base
        )
      ) +
      (baseList[Math.floor(this.exponent - 1)] || '') +
      currencyList[this.currency]
    }
  },
  methods: {
    change () {
      this.currency = (this.currency + 1) % currencyList.length
    },
    change2 () {
      this.action = 'あげる!'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
	font-family: 'notobk-subset';
	src: url('./assets/font/notobk-subset.otf') format('opentype');
}

.price {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

</style>
