<template>
  <div>
      <el-dialog
        v-if="visable"
        :title="'修改密码'"
        :close-on-click-modal="false"
        :visible.sync="visable">
        <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        >
        <el-form-item label="原密码" prop="oldPass">
            <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cookie from 'js-cookie';
import {updatePwd} from '@/api/modules/user.js'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
        visable:false,
      ruleForm: {
        uuid:null,
        oldPass:'',
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  components: {},

  computed: {},

  mounted() { },
  methods: {
    init(id){
          this.ruleForm.uuid=id;
          this.visable=true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePwd(this.ruleForm).then(resp=>{
            if(resp.status==200){
              this.$message({
                  message: resp.data,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                      
                  },
              });
              this.visable=false;
              this.$parent.getDataList();
            }else{
              this.$message({
                  message: resp.message,
                  type: "failed",
                  duration: 1500,
                  onClose: () => {
                      
                  },
              });
              this.visable=false
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}

</script>
<style scoped>
</style>