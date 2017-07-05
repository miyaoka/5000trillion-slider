<template>
  <div id="app">
    <div
      @click="cycleCurrency() + updateQuery()"
    >
      <metal-canvas
        ref="price"
        :text="price"
        :fontLoaded="fontLoaded"
        class="price"
        width="1280px"
        height="300px"
        :colors="priceColor"
      >
      </metal-canvas>
    </div>
    <div
      @click="cycleAction() + updateQuery()"
    >
      <metal-canvas
        ref="action"
        :text="action"
        :fontLoaded="fontLoaded"
        class="action"
        :width="Math.max(1560, action.length * 260) + 'px'"
        height="300px"
        :colors="actionColor"
      >
      </metal-canvas>
    </div>
    <div
      class="slider"
    >
      <range-slider
        :value="exponent"
        @input.native="updateExponent"
        @mouseup.native="updateQuery"
        @touchend.native="updateQuery"
        :max="expoMax"
        :step="0.00000001"
      ></range-slider>
    </div>

    <button
      @click="saveImage"
      class="saveBtn"
    >
      保存
    </button>
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
    }, 15),
    saveImage () {
      const buffer = document.createElement('canvas')
      buffer.width = 1560
      buffer.height = 600
      const bc = buffer.getContext('2d')
      bc.drawImage(this.$refs.price.$el, 0, 0)
      bc.drawImage(this.$refs.action.$el, 0, 300)

      const link = document.createElement('a')
      link.download = `${this.price}${this.action}.png`
      link.href = buffer.toDataURL('image/png')
      link.click()
    }
  }
}
</script>

<style scoped>
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

.price,
.action {
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.slider {
  margin: 40px 10px;
}

.saveBtn {
  font-size: 20px;
  position: relative;
  display: inline-block;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #FFF;
  background: #fd9535;/*背景色*/
  border-bottom: solid 2px #d27d00;/*少し濃い目の色に*/
  border-radius: 4px;/*角の丸み*/
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}

.saveBtn:active {
  border-bottom: solid 2px #fd9535;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
</style>
