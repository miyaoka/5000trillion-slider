<template>
  <canvas
    v-draw="{text, fontLoaded, colors}">
  </canvas>
</template>

<script>
const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`
const addColorStops = (grad, list) => {
  list.forEach(c => {
    grad.addColorStop(c[0], hsl(...c[1]))
  })
}

export default {
  props: {
    text: String,
    fontLoaded: Boolean,
    colors: {
      front: Array,
      frontEdge: Array,
      frontBase: Array,
      side: Array
    }
  },
  directives: {
    draw (el, binding) {
      if (!binding.value.fontLoaded) {
        return
      }
      const colors = binding.value.colors

      const ctx = el.getContext('2d')
      const text = binding.value.text
      const scale = 2.4
      const posx = el.width * 0.54 / scale
      const posy = 100
      let grad

      ctx.font = '100px notobk-subset'
      ctx.lineJoin = 'round'
      ctx.textAlign = 'center'

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, el.width, el.height)
      ctx.setTransform(1 * scale, 0, -0.4 * scale, 1 * scale, 0, 0)

      // 黒色
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 22
      ctx.strokeText(text, posx + 4, posy + 4)

      // 銀色
      grad = ctx.createLinearGradient(0, 24, 0, 112)
      addColorStops(grad, colors.side)
      ctx.strokeStyle = grad
      ctx.lineWidth = 20
      ctx.strokeText(text, posx + 3, posy + 3)

      // 黒色
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 16
      ctx.strokeText(text, posx, posy)

      // 金色
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      addColorStops(grad, colors.frontBase)
      ctx.strokeStyle = grad
      ctx.lineWidth = 11
      ctx.strokeText(text, posx + 1, posy - 2)

      // 黒
      ctx.lineWidth = 6
      ctx.strokeStyle = '#000'
      ctx.strokeText(text, posx + 2, posy - 3)

      // 白
      ctx.lineWidth = 5
      ctx.strokeStyle = '#FFFFFF'
      ctx.strokeText(text, posx, posy - 3)

      // 赤
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      addColorStops(grad, colors.frontEdge)
      ctx.lineWidth = 2.5
      ctx.strokeStyle = grad
      ctx.strokeText(text, posx, posy - 3)

      // 赤
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      addColorStops(grad, colors.front)
      ctx.fillStyle = grad
      ctx.fillText(text, posx, posy - 3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
