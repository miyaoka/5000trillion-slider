<template>
  <div id="app">
    <div
      @click="cycleCurrency() + updateQuery()"
    >
      <metal-canvas
        ref="price"
        :font="'NotoSansCJK-JP-miyaoka'"
        :text="price"
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
        :font="'NotoSerifCJK-JP-miyaoka'"
        :text="action"
        class="action"
        :width="Math.max(1560, action.length * 260) + 'px'"
        height="350px"
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


    <md-button
      class="md-raised"
      @click="reset() + updateQuery(false)"
    ><md-icon class="icon-refresh"></md-icon> リセット</md-button>

    <div>
      <md-button
        class="md-raised md-primary"
        @click="saveImage"
      ><md-icon class="icon-arrow-down-circle"></md-icon> 画像保存</md-button>
      <md-button
        class="md-raised md-accent"
        @click="tweet"
      ><md-icon class="icon-social-twitter"></md-icon> ツイートする</md-button>
    </div>
    <md-button
      href="https://github.com/miyaoka/5000trillion-slider"
      target="_blank"
    ><md-icon class="icon-info"></md-icon> info</md-button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { throttle } from 'lodash'
import MetalColors from './MetalColors'
import trimCanvas from '@/utils/trimCanvas'

import RangeSlider from '@/components/RangeSlider'
import MetalCanvas from '@/components/MetalCanvas'

const updateSliderSpan = 50
const trimmedCanvasPadding = 60

export default {
  components: {
    RangeSlider,
    MetalCanvas
  },
  data () {
    return {
      priceColor: MetalColors.price,
      actionColor: MetalColors.action
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
      'reset',
      'cycleCurrency',
      'cycleAction',
      'changeExponent'
    ]),
    updateQuery (setQuery = true) {
      this.$router.replace(setQuery ? {query: this.query} : {})
    },
    updateExponent: throttle(function (e) {
      this.changeExponent(e.target.value)
    }, updateSliderSpan),
    combineImage () {
      const canvasList = [
        this.$refs.price.$el,
        this.$refs.action.$el
      ]
      const buffer = document.createElement('canvas')
      const bufferCtx = buffer.getContext('2d')
      buffer.width = Math.min(...canvasList.map(el => el.width))
      buffer.height = canvasList.map(el => el.height).reduce((a, b) => a + b)

      let y = 0
      canvasList.forEach(el => {
        const h = el.height * buffer.width / el.width
        bufferCtx.drawImage(el, 0, y, buffer.width, h)
        y += h
      })
      return trimCanvas(buffer, trimmedCanvasPadding)
    },
    saveImage () {
      const link = document.createElement('a')
      link.href = this.combineImage().toDataURL('image/png')
      link.download = `${this.price}${this.action}.png`
      link.click()
    },
    tweet () {
      const link = document.createElement('a')

      link.href = [
        'https://twitter.com/intent/tweet',
        Object.entries({
          url: window.location.href,
          text: this.price + this.action + ' |',
          hashtags: '5000cho_slider'
        })
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&')
      ].join('?')
      link.setAttribute('target', '_blank')

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
  margin-top: 20px;
}

@font-face {
	font-family: 'NotoSansCJK-JP-miyaoka';
	src: url('../assets/font/NotoSansCJKjp-Bold-miyaoka.otf') format('opentype');
}

@font-face {
	font-family: 'NotoSerifCJK-JP-miyaoka';
	src: url('../assets/font/NotoSerifCJKjp-Bold-miyaoka.otf') format('opentype');
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
  margin: 40px 10px 20px;
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
