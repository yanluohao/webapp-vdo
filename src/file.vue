<template>
    <div class="file">
        <div class="file-box" :style="{minHeight:getContainerHeight+'px',width:getContainerWidth+'px'}" v-show="fileList.length>0">
            <div class="img-box" :style="{height:imgHeight+'px',width:imgWidth+'px'}" v-for="(file,index) in fileList">
                <img :src="file.path" alt="">
                <p class="name" alt="file.name">{{file.name}}-{{index}}</p>
                <div class="tips">
                    <p @click="removeFile(index)">删除</p>
                </div>
            </div>
        </div>
        <div class="file-btn">
            <input type="file" id="file-btn" @change="fileRead" multiple>
        </div>
    </div>
</template>

<script>

    export default{
        props:{
            imgHeight:{
                default:100
            },
            imgWidth:{
                default:100
            },
            // fileModal:{
            //     default(){
            //         return [];
            //     }
            // },
            maxCount:{
                default:4
            },
            maxSize:{
                default:5
            }
        },
        data(){
            return {
                fileList:[],
                ajaxData:new FormData(),
                tempArr:[]
            }
        },
        computed:{
            getContainerWidth(){
                return (this.imgWidth+20)*(this.fileList.length);
            },
            getContainerHeight(){
                return this.imgHeight+10;
            }
        },
        methods:{
            fileRead(e){
                let that=this;
                var files=e.target.files;
                if(files.length+this.tempArr.length>this.maxCount&&this.tempArr.length<this.maxCount){
                    alert("超出上传图片数量限制");
                    return false;                    
                }else if(files.length+this.tempArr.length<=this.maxCount){
                    Array.prototype.push.apply(this.tempArr, files);  //es5
                    // this.tempArr.push(...files);   //es6
                    let tmp=0;
                    arrayReader(tmp);
                    function arrayReader(i){
                        return new Promise(function(resolve,reject){
                            var reader=new FileReader();
                            reader.readAsDataURL(files[i]);                                
                            let name=files[i].name;
                            reader.onload=function(e){
                                var mb = (e.total / 1024) / 1024;   //获取上传内容的大小
                                if(mb>=that.maxSize){
                                    alert("图片大小超出限定的大小");
                                    return false;
                                }
                                if (that.fileList.length >= that.maxCount) {
                                    alert("超出上传图片数量限制");
                                    return false;
                                }
                                var obj={
                                    path:this.result,
                                    name:name
                                }
                                that.fileList.push(obj);
                                resolve(i);                                                    
                            }                            
                        }).then((res)=>{
                            if(res<files.length-1){
                                res++;
                                arrayReader(res);
                            }else{
                                console.log(that.tempArr,2);
                            }
                        })
                    }
                }else{
                    return false;
                }


                //ajax提交到后台
                // var xhr = new XMLHttpRequest();
                // xhr.open("POST", "controller.php");  假装有地址
                // xhr.onload = function () {
                //     if (this.status === 200) {
                //         //对请求成功的处理
                //         console.log(xhr.responseText);
                //     }
                // }
                // xhr.send(data);
            },
            removeFile(index){
                this.fileList.splice(index,1);
                this.tempArr.splice(index,1);
                this.ajaxData.delete('files[]');
                for(let i=0,len=this.tempArr.length;i<len;i++){
                    this.ajaxData.append('files[]',this.tempArr[i]);
                }
                console.log(this.ajaxData.getAll('files[]'))   
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .file-box
        border:1px dashed #ccc
        font-size:0
        .img-box
            display:inline-block
            position:relative
            box-sizing:border-box
            margin:5px 10px
            img
                width:100%
                height:100%
            &:hover .tips
                display:block   
            .name
                text-align:left
                font-size:14px
                width:100%
                padding-bottom:2px
                overflow:hidden
                text-overflow:ellipsis
                white-space:nowrap         
                cursor:pointer    
            .tips
                position:absolute
                display:none
                top:0
                left:0
                width:100%
                box-sizing:border-box
                height:20px
                line-height:20px
                background:rgba(0,0,0,.7)
                p
                    font-size:14px
                    color:#fff
                    text-align:right
                    padding-right:5px
                    cursor:pointer
</style>