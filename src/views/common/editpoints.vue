<template>
  <el-dialog
    v-if="visible"
    :title="dataForm.vsid==0 ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-input
        v-model="dataForm.vsid"
        style="display: none"></el-input>
      <el-form-item label="接种点名称" prop="content">
        <el-input
            v-model="dataForm.content"
            placeholder="请输入接种点名称"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="接种点地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="请输入接种点地址"></el-input>
      </el-form-item>
      <el-form-item label="工作时间" prop="working">
        <el-input v-model="dataForm.working" placeholder="请输入工作时间"></el-input>
      </el-form-item>
      <el-form-item label="经纬度" prop="position">
        <el-input v-model="dataForm.position" placeholder="请输入经纬度"></el-input>
      </el-form-item>
      
      <el-form-item label="简介" prop="synopsis">
        <el-input type="textarea" v-model="dataForm.synopsis" placeholder="请输入简介"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getPoint,updatePoints,addPoints} from '@/api/modules/point'
export default {
  data() {
    return {
        dataForm: {
            vsid: 0,
            content: "",
            address: "",
            position: "",
            working: "",
            synopsis: ""
        },
        dataRule: {
            content: [{ required: true, message: "不能为空", trigger: "blur" }],
            address: [{ required: true, message: "不能为空", trigger: "blur" }],
            position: [{ required: true, message: "不能为空", trigger: "blur" }],
            working: [{ required: true, message: "不能为空", trigger: "blur" }],
            synopsis: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        visible: false,
    };
  },
  created(){
        
  },
  methods: {
    init(id) {
        if(typeof(id)!="undefined"&&id!=0){
            let req = {
                vsid:id
            }
            getPoint(req).then(resp=>{
                if(resp.status==200){
                    this.dataForm=resp.data[0];
                }else{
                    this.$message({
                        message: "获取部门信息失败！",
                        type: "failed",
                        duration: 1500,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                }
            });
        }
        this.dataForm.visd = id || 0;
        this.visible = true;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.dataForm.vsid!=0){
              updatePoints(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.data,
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
            addPoints(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.data,
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
