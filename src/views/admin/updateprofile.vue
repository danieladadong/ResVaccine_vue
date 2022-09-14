<template>
        <el-dialog
        v-if="visable"
        :title="'修改信息'"
        :close-on-click-modal="false"
        :visible.sync="visable">
        <el-form label-width="100px" v-model="dataFrom" size="small" label-position="right">
            <el-form-item label="用户昵称：" prop="username">
                <el-input  auto-complete="off" v-model="dataForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input  auto-complete="off" v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-input  auto-complete="off" v-model="dataForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="idcard">
                <el-input  auto-complete="off" v-model="dataForm.idcard"></el-input>
            </el-form-item>
            <el-form-item label="出生日期：" prop="born">
                <el-input  auto-complete="off" v-model="dataForm.born"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
                <el-input auto-complete="off" v-model="dataForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input auto-complete="off" v-model="dataForm.address"></el-input>
            </el-form-item>
            <el-form-item label="用户类型：" prop="type">
                <el-input  :disabled="true" auto-complete="off" v-model="dataForm.type"></el-input>
            </el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">修改</el-button>
        </el-form>
    </el-dialog>
</template>
<script>
import cookie from  "js-cookie";
import {getProfile,updateProfile} from "@/api/modules/profile"
export default {
    data(){
        return{
            visable:false,
            dataForm:{
                uuid:null,
                username:"",
                name:"",
                sex:"",
                idcard:"",
                born:"",
                address:"",
                phone:"",
                type:""
            }
        }
    },
    created(){
        
    },
    methods:{
         init(id){
          this.visable=true;
          let req={
            uuid:id
        }
        getProfile(req).then(resp=>{
            if(resp.status==200){
                this.dataForm=resp.data[0]
            }else{
                this.$message({
                    message: resp.message,
                    type: "failed",
                    duration: 1500,
                    onClose: () => {
                        this.visible = false;
                    },
                });
            }
        })
        },
        dataFormSubmit(){
            updateProfile(this.dataForm).then(resp=>{
                if(resp.status==200){
                    this.$message({
                        message: resp.message,
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.visable = false;
                            this.$parent.getDataList();
                        },
                    });
                }else{
                    this.$message({
                        message: resp.message,
                        type: "failed",
                        duration: 1500,
                        onClose: () => {
                            this.visable = false;
                        },
                    });
                    this.visable=false;
                }
            })
        }
    }
}
</script>