<template>
    <div>
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
    </div>
</template>
<script>
import cookie from  "js-cookie";
import {getProfile,getProfiles,addProfile,updateProfile,deleteProfile} from "@/api/modules/profile"
export default {
    data(){
        return{
            dataForm:{
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
        var id = cookie.get("uuid")
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
    methods:{
        dataFormSubmit(){
            updateProfile(this.dataForm).then(resp=>{
                if(resp.status==200){
                    this.$message({
                        message: resp.message,
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                        },
                    });
                    this.$parent.getProfile()
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
        }
    }
}
</script>