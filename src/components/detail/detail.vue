<template>
    <transition name="move">
        <div id="detail" v-if="detailFlag">
            <div class="detail-box">
                <div class="top-bar">
                    <div class="back_btn" @click="hide"></div>
                    <div class="cover" :style="{backgroundImage:'url('+detail.images.large+')'}"></div>
                </div>
                <div class="info">
                    <div class="detail-title clearfix">
                        <div class="ava-container">
                            <img :src="detail.images.large" alt="" class="title_ava">
                        </div>
                        <p class="title">{{detail.title}}<br>{{detail.rating.average}}</p>
                    </div>
                    <div class="info-body">
                        <p class="key">原名</p>
                        <p class="value">{{detail.original_title}}</p>
                        <p class="key">类型</p>
                        <p class="value">{{movieType}}</p>
                        <p class="key">年代</p>
                        <p class="value">{{detail.year}}</p>
                        <p class="key">地区</p>
                        <p class="value">{{countries}}</p>
                        <p class="key">又名</p>
                        <p class="value">{{akaName}}</p>
                        <p class="key">想看人数</p>
                        <p class="value">{{detail.wish_count}}</p>
                        <p class="key">看过人数</p>
                        <p class="value">{{detail.collect_count}}</p>
                        <p class="key">评分人数</p>
                        <p class="value">{{detail.ratings_count}}</p>
                        <p class="key">短评数量</p>
                        <p class="value">{{detail.comments_count}}</p>
                        <p class="key">影评数量</p>
                        <p class="value">{{detail.reviews_count}}</p>
                    </div>
                    <div class="summary">
                        {{detail.summary}}
                    </div>
                    <div class="avatar-box">
                        <div class="avatar-title">导演</div>
                        <div class="ava_item" v-for="direct in detail.directors">
                            <div class="ava_box">
                                <div class="cover_box">
                                    <div class="ava_cover" :style="{backgroundImage:'url('+direct.avatars.large+')'}"></div>
                                </div>
                                <p>{{direct.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="avatar-box">
                        <div class="avatar-title">主演</div>
                        <div class="ava_item" v-for="direct in detail.casts">
                            <div class="ava_box">
                                <div class="cover_box">
                                    <div class="ava_cover" :style="{backgroundImage:'url('+direct.avatars.large+')'}"></div>
                                </div>
                                <p>{{direct.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </transition>
</template>

<script>
    import axios from "axios";
    // import footer from "../footer/footer.vue";

    export default {
        props:{
            id:{},
            detailFlag:{}
        },
        data(){
            return {
                detail:{},
                movieType:{},
                akaName:{},
                countries:{}
            }
        },
        created(){
            axios.get('/api/movie/subject/25884801').then((res)=>{
                this.detail=res.data;
                var movieType="";
                for(let i=0,len=res.data.genres.length;i<len;i++){
                    if(i==len-1){
                        movieType+=res.data.genres[i];
                    }else{
                        movieType+=res.data.genres[i]+'/';
                    }
                }
                this.movieType=movieType;

                var akaName="";
                for(let i=0,len=res.data.aka.length;i<len;i++){
                    if(i==len-1){
                        akaName+=res.data.aka[i];
                    }else{
                        akaName+=res.data.aka[i]+'/';
                    }
                }
                this.akaName=akaName;

                var countries="";
                for(let i=0,len=res.data.countries.length;i<len;i++){
                    if(i==len-1){
                        countries+=res.data.countries[i];
                    }else{
                        countries+=res.data.countries[i]+'/';
                    }
                }
                this.countries=countries;
            })
        },
        beforeUpdate(){
            axios.get('/api/movie/subject/'+this.id).then((res)=>{
                this.detail=res.data;
                var movieType="";
                for(let i=0,len=res.data.genres.length;i<len;i++){
                    if(i==len-1){
                        movieType+=res.data.genres[i];
                    }else{
                        movieType+=res.data.genres[i]+'/';
                    }
                }
                this.movieType=movieType;

                var akaName="";
                for(let i=0,len=res.data.aka.length;i<len;i++){
                    if(i==len-1){
                        akaName+=res.data.aka[i];
                    }else{
                        akaName+=res.data.aka[i]+'/';
                    }
                }
                this.akaName=akaName;

                var countries="";
                for(let i=0,len=res.data.countries.length;i<len;i++){
                    if(i==len-1){
                        countries+=res.data.countries[i];
                    }else{
                        countries+=res.data.countries[i]+'/';
                    }
                }
                this.countries=countries;
            })
        },
        methods:{
            show(){
                this.$emit('flagChange');
            },
            hide(){
                this.$emit('flagChange');
            }
        },
        components:{
            // "v-foot":footer
        }
    }
</script>

<style lang="stylus">
    #detail
        position:absolute
        top:0
        left:0
        bottom:0
        right:0
        width:100%
        height:100%
        background:#f5f5f5
        z-index:999
        // overflow:hidden
        // transform:translate3d(100%,0,0)
        transition: all .5s
        &.move-enter-active,&.move-leave
            transform:translate3d(0,0,0)
        &.move-enter,&.move-leave-active
            transform:translate3d(100%,0,0)
        .detail-box
            overflow-y:scroll
            .top-bar
                .back_btn
                    position:absolute
                    top:0
                    left:0
                    width:20px
                    height:20px
                    padding:10px
                    color:#fff
                    background:url('./back.png') no-repeat 100% 100%;
                .cover
                    width:100%
                    padding-top:80%
                    background-size:100%
            .info
                .detail-title
                    position:relative
                    padding:20px
                    box-shadow:0 0 15px 5px #ccc
                    .ava-container
                        float:left
                        width:30%
                        margin-top:-80px
                        .title_ava
                            width:100%
                    .title
                        float:left
                        margin-left:10px
                        line-height:24px
                .info-body
                    position:relative
                    padding:10px 30px
                    background:#f5f5f5
                    p
                        font-size:14px
                        font-weight:400
                        &.value
                            color:#888
                        &.key
                            margin-top:20px
                .summary
                    padding:30px 20px
                    font-size:14px
                    background:#eee
                .avatar-box
                    padding:20px 30px
                    font-size:0
                    background:#f5f5f5
                    .avatar-title
                        font-size:16px
                        padding-left:5px
                    .ava_item
                        display:inline-block
                        padding:5px 
                        width:50%
                        box-sizing:border-box
                        .ava_box
                            font-size:0
                            background:#fff
                            box-shadow:0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)
                            .cover_box
                                display:inline-block
                                width:50%
                                height:100%
                                .ava_cover
                                    width:100%
                                    background-size:100% 100%
                                    padding-top:141%
                            p
                                display:inline-block
                                box-sizing:border-box
                                vertical-align:top
                                padding:10px 0 0 10px
                                width:50%
                                font-size:14px
</style>