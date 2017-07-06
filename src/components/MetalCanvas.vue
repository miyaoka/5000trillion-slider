<template>
  <canvas></canvas>
</template>

<script>
import FontFaceObserver from 'fontfaceobserver'

const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`
const addColorStops = (grad, list) => {
  list.forEach(c => {
    grad.addColorStop(c[0], hsl(...c[1]))
  })
  return grad
}

export default {
  mounted () {
    new FontFaceObserver(this.font)
    .load()
    .then(() => {
      this.draw()
      this.$watch('text', this.draw)
    })
  },
  props: {
    text: String,
    font: String,
    colors: {
      front: Array,
      frontEdge: Array,
      frontBase: Array,
      side: Array
    }
  },
  methods: {
    draw () {
      const el = this.$el
      const ctx = el.getContext('2d')
      const scale = 2.4
      const posx = el.width * 0.54 / scale
      const posy = 100

      ctx.font = `100px ${this.font}`
      ctx.lineJoin = 'round'
      ctx.textAlign = 'center'

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, el.width, el.height)
      ctx.setTransform(1 * scale, 0, -0.4 * scale, 1 * scale, 0, 0)

      // 黒色
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 22
      ctx.strokeText(this.text, posx + 4, posy + 4)

      // 銀色
      ctx.lineWidth = 20
      ctx.strokeStyle = addColorStops(
        ctx.createLinearGradient(0, 24, 0, 112),
        this.colors.side
      )
      ctx.strokeText(this.text, posx + 3, posy + 3)

      // 黒色
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 16
      ctx.strokeText(this.text, posx, posy)

      // 金色
      ctx.lineWidth = 11
      ctx.strokeStyle = addColorStops(
        ctx.createLinearGradient(0, 20, 0, 100),
        this.colors.frontBase
      )
      ctx.strokeText(this.text, posx + 1, posy - 2)

      // 黒
      ctx.lineWidth = 6
      ctx.strokeStyle = '#000'
      ctx.strokeText(this.text, posx + 2, posy - 3)

      // 白
      ctx.lineWidth = 5
      ctx.strokeStyle = '#FFFFFF'
      ctx.strokeText(this.text, posx, posy - 3)

      // 赤
      ctx.lineWidth = 2.5
      ctx.strokeStyle = addColorStops(
        ctx.createLinearGradient(0, 20, 0, 100),
        this.colors.frontEdge
      )
      ctx.strokeText(this.text, posx, posy - 3)

      // 赤
      ctx.fillStyle = addColorStops(
        ctx.createLinearGradient(0, 20, 0, 100),
        this.colors.front
      )
      ctx.fillText(this.text, posx, posy - 3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
