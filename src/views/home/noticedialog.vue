<template>
    <div>
        <el-dialog
            v-if="visible"
            :close-on-click-modal="false"
            :visible.sync="visible">
            <div class="tree_title">
                <h1>{{dataForm.title}}</h1>
                <h3>
                    作者：<span>{{dataForm.name}}</span> 发布时间：<span>{{dataForm.creates}}</span>
                </h3>
            </div>
            <div class="vsb_content">
                <span>
                    {{dataForm.content}}
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="closeDialog()">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getNotice} from '@/api/modules/notice'
export default {
    data(){
        return{
            dataForm:[],
            visible: false
        }
    },
    methods: {
        init(id) {
            this.visible = true;
            if(typeof(id)!="undefined"&&id!=0){
                let req = {
					ntid:id
				}
				getNotice(req).then(resp=>{
					if(resp.status==200){
						this.dataForm = resp.data[0]
					}
				})
            }
        },
        closeDialog(){
            this.visible=false;
        }
    }
}
</script>
<style>
.tree_title{
    width: 100%;
    height: auto;
    border-bottom: 1px dashed #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.vsn_content{
    display: block;
}
</style>