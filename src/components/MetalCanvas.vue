<template>
  <canvas v-draw="{text, fontLoaded}">
  </canvas>
</template>

<script>
export default {
  props: {
    text: String,
    fontLoaded: Boolean
  },
  directives: {
    draw (el, binding) {
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
//      ctx.scale(2, 2)
      // 黒色
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 22
      ctx.strokeText(text, posx + 4, posy + 4)

      // 銀色
      grad = ctx.createLinearGradient(0, 24, 0, 122)
      grad.addColorStop(0.0, 'rgb(0,15,36)')
      grad.addColorStop(0.10, 'rgb(255,255,255)')
      grad.addColorStop(0.18, 'rgb(55,58,59)')
      grad.addColorStop(0.25, 'rgb(55,58,59)')
      grad.addColorStop(0.5, 'rgb(200,200,200)')
      grad.addColorStop(0.75, 'rgb(55,58,59)')
      grad.addColorStop(0.85, 'rgb(25,20,31)')
      grad.addColorStop(0.91, 'rgb(240,240,240)')
      grad.addColorStop(0.95, 'rgb(166,175,194)')
      grad.addColorStop(1, 'rgb(50,50,50)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 20
      ctx.strokeText(text, posx + 4, posy + 4)

      // 黒色
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 16
      ctx.strokeText(text, posx, posy)

      // 金色
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      grad.addColorStop(0, 'rgb(253,241,0)')
      grad.addColorStop(0.25, 'rgb(245,253,187)')
      grad.addColorStop(0.4, 'rgb(255,255,255)')
      grad.addColorStop(0.75, 'rgb(253,219,9)')
      grad.addColorStop(0.9, 'rgb(127,53,0)')
      grad.addColorStop(1, 'rgb(243,196,11)')
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
      grad.addColorStop(0, 'rgb(255, 100, 0)')
      grad.addColorStop(0.5, 'rgb(123, 0, 0)')
      grad.addColorStop(0.51, 'rgb(240, 0, 0)')
      grad.addColorStop(1, 'rgb(5, 0, 0)')
      ctx.lineWidth = 4
      ctx.strokeStyle = grad
      ctx.strokeText(text, posx, posy - 3)

      // 赤
      grad = ctx.createLinearGradient(0, 20, 0, 100)
      grad.addColorStop(0, 'rgb(230, 0, 0)')
      grad.addColorStop(0.5, 'rgb(123, 0, 0)')
      grad.addColorStop(0.51, 'rgb(240, 0, 0)')
      grad.addColorStop(1, 'rgb(5, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillText(text, posx, posy - 3)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
