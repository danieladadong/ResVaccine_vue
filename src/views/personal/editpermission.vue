<template>
  <el-dialog
    v-if="visible"
    :title="add ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-form-item label="医护姓名">
        <el-select
          v-if="add"
          v-model="dataForm.uuid"
          placeholder="请选择用户姓名"
          style="width: 100%">
          <el-option
            v-for="item in userData"
            :key="item.label"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-input
            v-if="!add"
            v-model="dataForm.name"
            placeholder="请输入医护人员姓名"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="接种凭证">
         <el-select
          v-model="dataForm.certificate"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
         <el-select
          v-model="dataForm.dept"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="员工">
         <el-select
          v-model="dataForm.emp"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告">
         <el-select
          v-model="dataForm.notice"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="权限">
         <el-select
          v-model="dataForm.permission"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接种点">
         <el-select
          v-model="dataForm.points"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约">
         <el-select
          v-model="dataForm.reservation"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户">
         <el-select
          v-model="dataForm.user"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="疫苗">
         <el-select
          v-model="dataForm.vaccines"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="仓库">
         <el-select
          v-model="dataForm.warehouse"
          placeholder="请选择"
          style="width: 100%">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
import {getPermission,updatePermissions,addPermissions} from '@/api/modules/permissions'
import {getUserByType,getAllUser} from '@/api/modules/user'
import cookie from 'js-cookie'
export default {
  data() {
    return {
      Options: [
        {
          value: 1,
          label: "授权",
        },
        {
          value: 0,
          label: "撤销",
        },
      ],
      visible: false,
      dataForm: {
        
      },
      userData:[],
      add:false
    };
  },
  created(){
      if(cookie.get("type")=='staff'){
          let req={
              type:'staff'
          }
          getUserByType(req).then(resp=>{
              if(resp.status==200){
                  for(var i=0;i<resp.data.length;i++){
                      let user = {
                          'label':resp.data[i].username,
                          'value':resp.data[i].uuid
                      }
                      this.userData.push(user)
                  }
              }
              console.log(this.userData)
          });
        }else{
            getAllUser().then(resp=>{
              if(resp.status==200){
                  console.log(resp.data)
                  for(var i=0;i<resp.data.length;i++){
                      let user = {
                          'label':resp.data[i].username,
                          'value':resp.data[i].uuid
                      }
                      this.userData.push(user)
                  }
              }
              console.log(this.userData)
          });
        }
  },
  methods: {
    init(id,add) {
        this.add = add
      if(typeof(id)!="undefined"&&id!=0){
        let req = {
         uuid:id
        }
        getPermission(req).then(resp=>{
          if(resp.status==200){
            this.dataForm=resp.data[0]
         }
        });
      }
      if(id!=0){
          this.dataForm.uuid = id;
      }
      this.visible = true;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(!this.add){
              updatePermissions(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.message,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$parent.getDataList();
                  },
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          }else{
            addPermissions(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$parent.getDataList();
                  },
                });
              }else{
                this.$message.error(resp.message);
              }
            });
          }
        }
      });
    },
  },
};
</script>
