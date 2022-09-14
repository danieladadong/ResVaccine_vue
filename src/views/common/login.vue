<template>
  <div style="height: 100%;">
    <div id="bg"></div>
    <el-card class="box-card">
      <div class="text item">
        <el-form
          :model="LoginData"
          status-icon
          :rules="rules"
          size="medium"
          ref="LoginData"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="角色" class="role">
            <el-select v-model="LoginData.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="user">
            <el-input v-model.number="LoginData.account" placeholder="手机号登录"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model.number="LoginData.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="margin-left:-30px;">
            <el-button type="primary" @click="submitForm('LoginData')">提交</el-button>
            <el-button @click="resetForm('LoginData')">重置</el-button>
            <el-button type="primary" @click="register()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <reader-add-or-update v-if="readerAddOrUpdateVisable" ref="addOrUpdate"></reader-add-or-update>
  </div>
</template>
<script>
import cookie from "js-cookie";
import ReaderAddOrUpdate from './regist.vue';
import { Login, Regist } from '@/api/modules/login'
import {getEmp} from '@/api/modules/emp'
import {getProfile} from '@/api/modules/profile'
export default {
  components: { ReaderAddOrUpdate },
  data() {
    var checkUser = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("用户不能为空"));
      }
      setTimeout(() => {
        if (value.toString().length != 11) {
          callback(new Error("手机号长度有误"));
        } else {
          callback();
        }
      }, 1000);
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.LoginData.checkPass !== "") {
          this.$refs.LoginData.validateField("checkPass");
        }
        callback();
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      readerAddOrUpdateVisable: false,
      radio: '1',
      LoginData: {
        account: "",
        password: "",
        type:"staff"
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkUser, trigger: "blur" }]
      },
      options: [{
        value: 'customer',
        label: '普通用户'
      }, {
        value: 'staff',
        label: '工作人员'
      }, {
        value: 'admin',
        label: '管理员'
      }],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.LoginData.type) {
            switch (this.LoginData.type) {
              case 'customer':
                sessionStorage.setItem('role','user')
                break;
              case 'staff':
                  sessionStorage.setItem('role','worker');
                break;
              case 'admin':
                sessionStorage.setItem('role','admin')
                break;
              default:
                break;
            }
            Login(this.LoginData).then(resp => {
              if (resp.status == 200) {
                cookie.set("token", resp.data)
                var strings = resp.data.split(".");//通过split()方法将token转为字符串数组
                //取strings[1]数组中的第二个字符进行解析
                var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
                //然后可以拿到解析后的数据，可以console.log()打印下，
                //然后赋值自己需要的数据
                var uuid = userinfo.uuid;
                cookie.set("uuid", uuid)
                cookie.set("type", userinfo.type)
                if(userinfo.type=='staff'){
                  let req={
                    uuid:uuid
                  }
                  getEmp(req).then(resp=>{
                    if(resp.status==200){
                      cookie.set("vsid",resp.data[0].vsid);
                    }
                  });
                }
                let req={
                    uuid:uuid
                }
                getEmp(req).then(resp=>{
                  if(resp.status==200){
                    cookie.set("vsid",resp.data[0].vsid);
                  }
                });
                getProfile(req).then(resp=>{
                  if(resp.status==200){
                    cookie.set("name",resp.data[0].name)
                  }
                });
                setTimeout(() => {
                this.$router.push('/system')
                this.$message.success('登录成功')
                }, 500);
              } else {
                this.$message({
                  message: resp.message,
                  type: 'error',
                })
              }
            })
          }else{
            return this.$message.error('请选择角色')
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.readerAddOrUpdateVisable = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
    },
  },
  created() {
    this.$message({
      type: "info",
      message: "请登录",
    });
  }
};
</script>
<style scoped>
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#bg {
  background: url("../../assets/sdwu.jpg") no-repeat;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  filter: blur(6px);
  z-index: -2;
  position: absolute;
  top: 0px;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 20px;
}
.box-card {
  width: 480px;
}
.demo-ruleForm {
  margin-left: -35px;
  margin-top: 50px;
}
.el-select {
  width: 100%;
}
.el-form-item{
  width: 450px !important;
}
</style>
