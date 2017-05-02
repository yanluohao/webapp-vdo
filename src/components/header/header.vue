<template>
    <transition name="move">
        <div id="header" v-show="!detailFlag">
            <div class="top">
                <div class="left clearfix">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="title">电影</div>
                <div class="right">
                    <img src="./search.png" alt="">
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li :class="{'active':navCode===0}" @click="tabNav(0)">正在热映</li>
                    <li :class="{'active':navCode===1}" @click="tabNav(1)">即将上映</li>
                </ul>
                <i class="bottom-line" :style="{transform:'translate3d('+linePos+',0,0)'}"></i>
            </div>
        </div>    
    </transition>
</template>

<script>

export default {
    props:{
        navCode:{},
        detailFlag:{}
    },
    data(){
        return {
            linePos:0
        }
    },
    methods:{
        tabNav(num){
            this.linePos=num==0?0:'100%';
            this.$emit('tabNavCode',num);
        }
    }
}
</script>

<style lang="stylus">
    #header
        width:100%
        background:#474a4f
        box-shadow:0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451)
        .top
            display:flex        
            height:50px
            color:#fff
            .left
                width:40px
                height:26px
                margin:0 0 0 10px
                padding:12px 0
                span
                    display:block
                    margin:5px auto 0
                    width:20px
                    height:2px
                    background:#fff
            .title
                flex:1
                padding-left:10px
                line-height:48px
                font-size:20px
            .right
                width:50px
                height:50px
                text-align:center
                img
                    margin-top:9px
        .nav
            width:100%
            color:#ccc
            font-size:0px
            li
                display:inline-block
                width:50%
                height:50px
                line-height:50px
                text-align:center
                font-size:14px
                &.active
                    color:#fff
            .bottom-line
                display:inline-block
                width:50%
                height:2px
                background:#ff6b00
                transition:all .5s
</style>
