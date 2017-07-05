<template>
  <input
    class="range-slider"
    type="range"
    :value="value"
    :min="0"
    :max="max"
    :step="step"
  >
</template>

<script>

export default {
  props: {
    value: Number,
    max: Number,
    step: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.range-slider {

  --thumb-size: 50px;
  --thumb-radius: 45%;
  --track-height: 20px;
  --track-color: #f8f8f8;

  -webkit-appearance: none;
  width: 100%;
  margin: 25px 0;

  &:focus {
    outline: none;

    &::-webkit-slider-runnable-track {
      background: var(--track-color);
    }
    &::-ms-fill-lower {
      background: var(--track-color);
    }
    &::-ms-fill-upper {
      background: var(--track-color);
    }
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: var(--track-color);
    border-radius: 8px;
    border: 0.2px solid #010101;
  }
  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 3px solid #000000;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: var(--thumb-radius);
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: calc( (var(--thumb-size) - var(--track-height)) * -.5);
  }

  &::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: var(--track-color);
    border-radius: 8px;
    border: 0.2px solid #010101;
  }
  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 3px solid #000000;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: var(--thumb-radius);
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: var(--track-color);
    border: 0.2px solid #010101;
    border-radius: var(--track-height);
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &::-ms-fill-upper {
    background: var(--track-color);
    border: 0.2px solid #010101;
    border-radius: var(--track-height);
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  &::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 3px solid #000000;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: var(--thumb-radius);
    background: #ffffff;
    cursor: pointer;
    height: var(--track-height);
  }

}

</style>
