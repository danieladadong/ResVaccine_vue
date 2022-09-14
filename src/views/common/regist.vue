<template>
  <el-dialog
    :title="!dataForm.uuid ? '注册' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="100px"
    >
      <el-form-item label="昵称" prop="username">
        <el-input v-model="dataForm.username" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="account">
        <el-input
          v-model="dataForm.account"
          placeholder="请输入电话"
          :disabled="dataForm.uuid != 0"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="dataForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
        <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="dataForm.password" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select
          v-model="dataForm.type"
          style="width:100%"
          placeholder="请选择注册类型">
          <el-option
            v-for="item in typeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cookie from "js-cookie";
import {Regist} from '@/api/modules/login'
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^1[345789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      typeData:[
        {
          label: "普通用户",
          value: "customer",
        },
        {
          label: "工作人员",
          value: "staff",
        },
         {
          label: "管理员",
          value: "admin",
        }
      ],
      dataForm: {
        uuid: 0,
        username: "",
        account: "",
        password: "",
        type: ""
      },
      dataRule: {
        username: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        account: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {
            validator: checkPhone,
            type: "number",
            message: "手机格式有误",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择注册类型", trigger: 'blur'},
        ]
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.uuid = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.uuid) {
          this.$http({}).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.username = data.manager.username;
              this.dataForm.account = data.manager.account;
              this.dataForm.password = data.manager.password;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          Regist(this.dataForm).then(resp => {
            if (resp.status == 200) {
              this.$message({
                message: resp.message,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshData");
                },
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
  },
};
</script>
