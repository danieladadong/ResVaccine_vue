<template>
    <div>
        <el-form label-width="100px" v-model="dataFrom" size="small" label-position="right">
            <el-form-item label="姓名：" prop="name">
                <el-input disabled  auto-complete="off" v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item  label="职务：" prop="job">
                <el-input disabled auto-complete="off" v-model="dataForm.job"></el-input>
            </el-form-item>
            <el-form-item label="入职时间：" prop="hiredate">
                <el-input disabled auto-complete="off" v-model="dataForm.hiredate"></el-input>
            </el-form-item>
            <el-form-item label="所属医院：" prop="dname">
                <el-input disabled auto-complete="off" v-model="dataForm.dname"></el-input>
            </el-form-item>
            <el-form-item label="工作地点：" prop="content">
                <el-input disabled auto-complete="off" v-model="dataForm.content"></el-input>
            </el-form-item>
            <el-form-item label="详细地址：" prop="loc">
                <el-input disabled auto-complete="off" v-model="dataForm.loc"></el-input>
            </el-form-item>
            <el-form-item label="月薪：" prop="sal">
                <el-input  disabled auto-complete="off" v-model="dataForm.sal"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import cookie from  "js-cookie";
import {getEmp} from '@/api/modules/emp'
export default {
    data(){
        return{
            dataForm:{

            }
        }
    },
    created(){
        var id = cookie.get("uuid")
        let req={
            uuid:id
        }
        getEmp(req).then(resp=>{
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