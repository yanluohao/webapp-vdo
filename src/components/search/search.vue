<template>
    <div id="search">
        <div class="input">
            <div class="back">
                <span class="iconfont icon-fanhui"></span>
            </div>
            <div class="search-content">
                <input type="text" placeholder="请输入您要搜索的关键词">
            </div>
            <div class="empty">
                <span class="iconfont icon-quxiao"></span>
            </div>
        </div>
        <div class="result">

        </div>
    </div>
</template>
<script>

export default{
    methods:{

    }
}
</script>

<style lang="stylus">
    #search
        .input
            position:relative
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
                        font-size:40px
                        padding-top:6px
                &.search-content
                    input
                        display:inline-block
                        height:100%
</style>