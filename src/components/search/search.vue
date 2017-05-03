<template>
    <div id="search">
        <div class="input">
            <div class="back">
                <router-link to="/">
                    <span class="iconfont icon-fanhui"></span>
                </router-link>
            </div>
            <div class="search-content">
                <input type="text" placeholder="请输入您要搜索的关键词" v-model="inputInfo" @keyup="getInfo">
            </div>
            <div class="empty" @click="clearInput">
                <span class="iconfont icon-quxiao"></span>
            </div>
        </div>
        <div class="result">
            <ul class="result-list" v-if="searchResult.length>0">
                <li v-for="(movie,index) in searchResult" class="clearfix">
                    <div class="cover" :style="{backgroundImage:'url('+movie.images.large+')'}"></div>
                    <div class="intro">
                        <span class="title">{{movie.title}}</span><span class="year">{{movie.year}}年</span>
                        <div class="rating">{{movie.rating.average==0?"暂无评价":movie.rating.average}}</div>
                        <p>类型:{{movie.genres.join("/")}}</p>
                        <p>导演:{{direct[index]}}</p>
                        <p>主演:{{actors[index]}}</p>
                    </div>
                </li>
            </ul>
            <div v-show="searchResult.length===0&&searchKeyUp===true" class="tips">
                暂时没有该影片信息哦，请联系管理员添加
            </div>
        </div>
        <v-foot></v-foot>
    </div>
</template>
<script>
import axios from "axios";
import footer from "../footer/footer.vue";

export default{
    data(){
        return {
            inputInfo:"",
            searchResult:[],
            searchKeyUp:false,
            direct:[],
            actors:[]
        }
    },
    methods:{
        clearInput(){
            this.inputInfo="";
        },
        getInfo(e){
            if(e.keyCode===13){
                var inputInfo=this.inputInfo.trim();
                axios.get(`/api/movie/search?q=${inputInfo}`).then((res)=>{
                    this.searchResult=res.data.subjects;
                    var direct=[];
                    var actors=[];
                    this.searchResult.map((item,index)=>{
                        var arr=[];
                        item.directors.map((direct,index)=>{
                            arr.push(direct.name);
                        })
                        direct.push(arr.join("/"));

                        var arr2=[];
                        item.casts.map((cast,index)=>{
                            arr2.push(cast.name);
                        })
                        actors.push(arr2.join("/"));
                    })
                    this.direct=direct;
                    this.actors=actors;
                    if(this.searchKeyUp===false)this.searchKeyUp=true;    
                    //关闭手机键盘
                    e.target.blur();                 
                })               
            }
        }
    },
    components:{
        "v-foot":footer
    }
}
</script>

<style lang="stylus">
html
    height:100%
    body
        height:100%
        #app
            height:100%
            #search
                position:relative
                min-height:100%
                .input
                    position:relative
                    display:flex
                    height:50px
                    font-size:0
                    background:#fff
                    box-shadow:0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)
                    &>div
                        display:inline-block
                        &.back
                            margin:2px 0 0 20px
                            width:45px
                            height:45px
                            span
                                display:inline-block
                                font-size:30px
                                margin:10px 0 0 6px
                        &.search-content
                            flex:1
                            height:100%
                            input
                                display:inline-block
                                width:100%
                                height:100%
                                font-size:16px
                        &.empty
                            margin:2px 0 0 20px
                            width:45px
                            height:45px
                            span
                                display:inline-block
                                font-size:20px
                                margin:14px 0 0 12px     
                .result
                    padding-bottom:80px
                    .tips   
                        margin-top:100px
                        text-align:center
                    .result-list
                        li
                            margin:10px 15px    
                            background:#fff
                            box-shadow:0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)
                            border-radius:2px
                            font-size:0             
                            .cover
                                float:left
                                width:30%
                                background-size:100% 100%
                                padding-top:40%
                            .intro
                                float:left
                                width:70%
                                box-sizing:border-box
                                padding:10px
                                font-size:14px
                                .title
                                    font-size:16px
                                    font-weight:bold
                                .year
                                    color:#ccc
                                    margin-left:10px
</style>