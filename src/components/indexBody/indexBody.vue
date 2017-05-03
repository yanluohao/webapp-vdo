<template>
    <div id="index-body">
        <transition name="move">
            <div id="hot-line" v-show="navCode==0&&!detailFlag">
                <div class="wrap">
                    <div class="item" v-for="item in hot" @click="selectItem(item.id)">
                        <div class="box">
                            <div class="cover" :style="{backgroundImage:'url('+item.images.large+')'}"></div>
                            <p class="title" :alt="item.title">{{item.title}}</p>
                            <p class="rating">{{item.rating.average=item.rating.average==0?'暂无评价':item.rating.average}}</p>
                        </div>
                    </div>
                </div>
            </div>        
            
        </transition>
        <transition name="move">
            <div id="coming-soon" v-show ="navCode==1&&!detailFlag">
                <div class="wrap">
                    <div class="item" v-for="item in comingSoon" @click="selectItem(item.id)">
                        <div class="box">
                            <div class="cover" :style="{backgroundImage:'url('+item.images.large+')'}"></div>
                            <p class="title" :alt="item.title">{{item.title}}</p>
                            <p class="rating">{{item.rating.average=item.rating.average==0?'暂无评价':item.rating.average}}</p>
                        </div>
                    </div>
                </div>
            </div>        
            
        </transition>
        <detail :id="id" ref="detail" :detailFlag="detailFlag" @flagChange="flagChange"></detail>
    </div>
</template>

<script>
import axios from "axios";
import detail from "../detail/detail";
import footer from "../footer/footer";

export default {
    props:{
        navCode:{},
        detailFlag:{}
    },
    data(){
        return {
            hot:[],
            comingSoon:[],
            id:{}
        }
    },
    beforeCreate(){
        axios.get('/api/movie/in_theaters').then((res)=>{
            this.hot=res.data.subjects;
        })
        axios.get('/api/movie/coming_soon').then((res)=>{
            this.comingSoon=res.data.subjects;
        })
    },
    methods:{
        selectItem(id){
            this.id=id;
            this.$refs.detail.show();
        },
        flagChange(){
            this.$emit('flagChange');
        }
    },
    components:{
        detail,
        "v-foot":footer
    }
}
</script>

<style lang="stylus">
    #index-body
        width:100%
        overflow-x:hidden
        #hot-line
            position:absolute
            width:100%
            transition:all .5s
            &.move-enter-active,&.move-leave
                transform:translate3d(0,0,0)
            &.move-enter,&.move-leave-active
                transform:translate3d(-100%,0,0)
        .wrap
            padding:10px
            font-size:0px 
            .item
                width:33.3%
                display:inline-block
                box-sizing:border-box
                padding:5px
                font-size:0px
                border-radius:4px
                .box
                    border-radius:2px
                    box-shadow:0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)
                    .cover
                        width:100%
                        padding-top:141%
                        border-radius:2px 2px 0 0
                        background-size:100% 100%
                    p
                        text-align:center
                        font-size:12px
                        width:100%
                        height:20px
                        line-height:20px
                        overflow:hidden
                        text-overflow:ellipsis
                        white-space:nowrap
                        &.title
                            font-size:14px
                        &.rating
                            color:#ff6b00
        #coming-soon
            position:absolute
            width:100%
            transition:all .5s
            &.move-enter-active,&.move-leave
                transform:translate3d(0,0,0)
            &.move-enter,&.move-leave-active
                transform:translate3d(100%,0,0)
</style>
