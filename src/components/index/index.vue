<template>
  <div id="index">
    <v-head :navCode="navCode" @tabNavCode="tabNavCode"></v-head>
    <indexBody :navCode="navCode" @flagChange="flagChange" :detailFlag="detailFlag"></indexBody>
  </div>
</template>

<script>
import header from "../header/header";
import indexBody from "../indexBody/indexBody";

export default {
    data(){
        return {
            navCode:0,
            detailFlag:false
        }
    },
    methods:{
        tabNavCode(num){
            this.navCode=num;
        },
        flagChange(){
            this.detailFlag=!this.detailFlag;
        }
    },
    components:{
        "v-head":header,
        indexBody
    }
}
</script>

<style>

</style>
