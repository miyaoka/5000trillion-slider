export default (canvas) => {
  const ctx = canvas.getContext('2d')
  const copy = document.createElement('canvas').getContext('2d')

  const bounds = getBounds(canvas)

  const trimHeight = bounds.bottom - bounds.top
  const trimWidth = bounds.right - bounds.left
  const trimmed = ctx.getImageData(bounds.left, bounds.top, trimWidth, trimHeight)

  copy.canvas.width = trimWidth
  copy.canvas.height = trimHeight
  copy.putImageData(trimmed, 0, 0)

  return copy.canvas
}

const getBounds = (canvas) => {
  const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
  const bounds = {
    top: null,
    left: null,
    right: null,
    bottom: null
  }
  const l = pixels.data.length
  let i, x, y

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % canvas.width
      y = ~~((i / 4) / canvas.width)

      if (bounds.top === null) {
        bounds.top = y
      }

      if (bounds.left === null) {
        bounds.left = x
      } else if (x < bounds.left) {
        bounds.left = x
      }

      if (bounds.right === null) {
        bounds.right = x
      } else if (bounds.right < x) {
        bounds.right = x
      }

      if (bounds.bottom === null) {
        bounds.bottom = y
      } else if (bounds.bottom < y) {
        bounds.bottom = y
      }
    }
  }
  return bounds
}
