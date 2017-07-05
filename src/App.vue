<template>
  <router-view class="main"></router-view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.parseQuery(this.$route.query)
  },
  methods: {
    ...mapActions([
      'parseQuery'
    ])
  }
}
</script>

<style>
html,
body {
  margin: 0;
}

input,
textarea,
select,
button {
  outline: none;
}
</style>
