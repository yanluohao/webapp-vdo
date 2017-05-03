<template>
  <div id="app">
    <transition :name="transitionName"> 
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import index from './components/index/index.vue';
import search from './components/search/search';

export default {
  data(){
    return {
      transitionName:""
    }
  },
  name: 'app',
  components:{
    index,
    search
  },
  watch:{
    '$route'(to,from){
      const toPath=to.path.split("/")[1];
      if(toPath.length===0){
        this.transitionName="slide-right";
      }else{
        this.transitionName="slide-left";
      }
    }
  }
}
</script>

<style lang="stylus">
    #app
      background:#f5f5f5
    .slide-left-enter-active,.slide-left-leave
      transform:translate3d(0,0,0);
      opacity:1
      transition:all .5s
    .slide-left-leave-active,.slide-left-enter
      transform:translate3d(100%,0,0);
      opacity:0
    .slide-right-enter-active,.slide-right-leave
      transform:translate3d(0,0,0);
      opacity:1
      transition:all .5s
    .slide-right-leave-active,.slide-right-enter
      transform:translate3d(-100%,0,0);
      opacity:0          
</style>
