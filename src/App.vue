<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import index from './components/index/index.vue';

export default {
  name: 'app',
  components:{
    index
  }
}
</script>

<style lang="stylus">
    #app
      background:#f5f5f5
</style>
