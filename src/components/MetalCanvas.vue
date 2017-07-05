<template>
  <canvas
    v-draw="{text, fontLoaded}">
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
    fontLoaded: Boolean
  },
  directives: {
    draw (el, binding) {
      if (!binding.value.fontLoaded) {
        return
      }
      const ctx = el.getContext('2d')
      const text = binding.value.text
      const scale = 1
      const posx = el.width * 0.5 / scale
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
      grad = ctx.createLinearGradient(0, 24, 0, 122)
      addColorStops(grad, [
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
      ])
      ctx.strokeStyle = grad
      ctx.lineWidth = 20
      ctx.strokeText(text, posx + 4, posy + 4)

      // 黒色
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 16
      ctx.strokeText(text, posx, posy)

      // 金色
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      addColorStops(grad, [
        [0, [57, 100, 49.6]],
        [0.25, [67, 94.3, 86.3]],
        [0.4, [0, 0, 100]],
        [0.75, [52, 98.4, 51.4]],
        [0.9, [25, 100, 24.9]],
        [1, [48, 91.3, 49.8]]
      ])
      ctx.strokeStyle = grad
      ctx.lineWidth = 10
      ctx.strokeText(text, posx, posy)

      // 黒
      ctx.lineWidth = 6
      ctx.strokeStyle = '#000'
      ctx.strokeText(text, posx + 2, posy - 3)

      // 白
      ctx.lineWidth = 6
      ctx.strokeStyle = '#FFFFFF'
      ctx.strokeText(text, posx, posy - 3)

      // 赤
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      addColorStops(grad, [
        [0, [24, 100, 50]],
        [0.5, [0, 100, 24.1]],
        [0.51, [0, 100, 47.1]],
        [1, [0, 100, 1]]
      ])
      ctx.lineWidth = 4
      ctx.strokeStyle = grad
      ctx.strokeText(text, posx, posy - 3)

      // 赤
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      addColorStops(grad, [
        [0, [0, 100, 45.1]],
        [0.5, [0, 100, 24.1]],
        [0.51, [0, 100, 47.1]],
        [1, [0, 100, 1]]
      ])
      ctx.fillStyle = grad
      ctx.fillText(text, posx, posy - 3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
