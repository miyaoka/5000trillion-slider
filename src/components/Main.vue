<template>
  <div id="app">
    <div
      @click="cycleCurrency"
    >
      {{price}}
    </div>
    <div
      @click="cycleAction"
    >
      {{action}}
    </div>
    <div>
      {{priceValue}}
    </div>


    <div
      @click="cycleCurrency() + updateQuery()"
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
      @click="cycleAction() + updateQuery()"
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
      :value="exponent"
      @input="changeExponent($event)"
      @mouseup.native="updateQuery"
      @touchend.native="updateQuery"
      :max="expoMax"
      :step="0.00000001"
    ></range-slider>
  </div>
</template>

<script>
import FontFaceObserver from 'fontfaceobserver'
import { mapGetters, mapActions } from 'vuex'

import RangeSlider from '@/components/RangeSlider'
import MetalCanvas from '@/components/MetalCanvas'

const font = new FontFaceObserver('notobk-subset')

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
      fontLoaded: false
    }
  },
  computed: {
    ...mapGetters([
      'exponent',
      'price',
      'action',
      'priceValue',
      'query',
      'expoMax'
    ])
  },
  methods: {
    ...mapActions([
      'cycleCurrency',
      'cycleAction',
      'changeExponent'
    ]),
    updateQuery () {
      this.$router.replace({query: this.query})
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
	src: url('../assets/font/notobk-subset.otf') format('opentype');
}

.price {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

</style>
