<template>
  <div id="app">
    <search></search>
    <v-foot></v-foot>
  </div>
</template>

<script>
import index from './components/index/index.vue';
import footer from "./components/footer/footer.vue";
import search from './components/search/search';

export default {
  name: 'app',
  components:{
    index,
    "v-foot":footer,
    search
  }
}
</script>

<style lang="stylus">
    #app
      background:#f5f5f5
</style>
