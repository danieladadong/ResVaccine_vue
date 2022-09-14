<template>
  <el-dialog
    v-if="visible"
    :title="dataForm.deptno==0 ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-input
        v-model="dataForm.deptno"
        style="display: none"></el-input>
      <el-form-item label="部门名称" prop="dname">
        <el-input
            v-model="dataForm.dname"
            placeholder="请输入部门名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="部门地点" prop="loc">
        <el-input v-model="dataForm.loc" placeholder="请输入部门地点"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getDept,putDept,postDept} from '@/api/modules/dept';
export default {
  data() {
    return {
        dataForm: {
            deptno: 0,
            dname: "",
            loc: "",
        },
        dataRule: {
            dname: [{ required: true, message: "不能为空", trigger: "blur" }],
            loc: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
        visible: false,
    };
  },
  created(){
        
  },
  methods: {
    init(id) {
        if(typeof(id)!="undefined"&&id!=0){
          console.log(id)
            let req = {
                deptno:id
            }
            getDept(req).then(resp=>{
                if(resp.status==200){
                    this.dataForm=resp.data[0];
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
            });
        }
        this.dataForm.deptno = id || 0;
        this.visible = true;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.dataForm.deptno!=0){
              putDept(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.message,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$parent.getDataList()
                  },
                });
              } else {
                this.$message.error(resp.message);
              }
            });
          }else{
            postDept(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit("refreshDataList");
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
