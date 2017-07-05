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
        :colors="priceColor"
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
        :colors="actionColor"
      >
      </metal-canvas>
    </div>
    <range-slider
      :value="exponent"
      @input.native="updateExponent"
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
import debounce from 'debounce'

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
      fontLoaded: false,
      priceColor: {
        front: [
          [0, [0, 100, 45]],
          [0.5, [0, 100, 24]],
          [0.51, [0, 100, 47]],
          [1, [0, 100, 1]]
        ],
        frontEdge: [
          [0, [24, 100, 50]],
          [0.5, [0, 100, 24]],
          [0.51, [0, 100, 47]],
          [1, [0, 100, 1]]
        ],
        frontBase: [
          [0, [57, 100, 49.6]],
          [0.25, [67, 94.3, 86.3]],
          [0.4, [0, 0, 100]],
          [0.75, [52, 98.4, 51.4]],
          [0.9, [25, 100, 24.9]],
          [1, [48, 91.3, 49.8]]
        ],
        side: [
          [0.0, [215, 100, 7.1]],
          [0.10, [0, 0, 100]],
          [0.18, [195, 3.5, 22.4]],
          [0.25, [195, 3.5, 22.4]],
          [0.5, [0, 0, 78.4]],
          [0.75, [195, 3.5, 22.4]],
          [0.85, [267, 21.6, 10.0]],
          [0.91, [0, 0, 94.1]],
          [0.95, [221, 18.7, 70.6]],
          [1, [0, 0, 19.6]]
        ]
      },
      actionColor: {
        front: [
          [0, [205, 20, 100]],
          [0.35, [205, 20, 90]],
          [0.5, [205, 20, 50]],
          [0.7, [205, 20, 85]],
          [1, [205, 20, 100]]
        ],
        frontEdge: [
          [0, [205, 20, 20]],
          [0.4, [205, 20, 15]],
          [0.5, [205, 20, 0]],
          [0.6, [205, 20, 15]],
          [1, [205, 20, 20]]
        ],
        frontBase: [
          [0, [205, 20, 49.6]],
          [0.25, [205, 20, 86.3]],
          [0.4, [205, 20, 100]],
          [0.75, [205, 20, 51.4]],
          [0.9, [205, 20, 24.9]],
          [1, [205, 40, 80]]
        ],
        side: [
          [0.0, [215, 100, 7.1]],
          [0.10, [0, 0, 100]],
          [0.18, [195, 3.5, 22.4]],
          [0.25, [195, 3.5, 22.4]],
          [0.5, [0, 0, 78.4]],
          [0.75, [195, 3.5, 22.4]],
          [0.85, [267, 21.6, 10.0]],
          [0.91, [0, 0, 94.1]],
          [0.95, [221, 18.7, 70.6]],
          [1, [0, 0, 19.6]]
        ]
      }
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
    },
    updateExponent: debounce(function (e) {
      this.changeExponent(e.target.value)
    }, 15)
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
