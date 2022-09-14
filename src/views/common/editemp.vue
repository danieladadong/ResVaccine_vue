<template>
  <el-dialog
    v-if="visible"
    :title="add ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-input
        v-model="doctorData.uuid"
        style="display: none"></el-input>
      <el-form-item label="医护姓名">
        <el-select
          v-if="add"
          v-model="dataForm.uuid"
          placeholder="请选择医护人员姓名"
          style="width: 100%">
          <el-option
            v-for="item in doctorData"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"></el-option>
        </el-select>
        <el-input
            v-if="!add"
            v-model="dataForm.name"
            placeholder="请输入医护人员姓名"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="职务" prop="job">
        <!-- <el-input v-model="dataForm.postType" placeholder=""></el-input> -->
         <el-select
          v-model="dataForm.job"
          placeholder="请选择职务"
          style="width: 100%">
          <el-option
            v-for="item in jobOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级领导" prop="mgr">
          <el-select
            v-model="dataForm.mgr"
            style="width: 100%"
            placeholder="请选择上级领导">
          <el-option
            v-for="item in doctorData"
            :key="item.uuid"
            :label="item.name"
            :value="item.uuid"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="加入时间" prop="hiredate">
        <!-- <el-input v-model="dataForm.inTime" placeholder=""></el-input> -->
        <el-date-picker
          v-model="dataForm.hiredate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="加入时间"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="月工资" prop="sal">
        <el-input-number
          v-model="dataForm.sal"
          style="width: 100%"></el-input-number>
      </el-form-item>
      <el-form-item label="工作部门">
        <el-select
          style="width: 100%"
          v-model="dataForm.deptno"
          placeholder="请选择工作部门">
          <el-option
          v-for="item in deptData"
          :key="item.deptno"
          :label="item.dname"
          :value="item.deptno"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作场所">
        <el-select
          v-model="dataForm.vsid"
          style="width: 100%"
          placeholder="请选择工作场所">
          <el-option
            v-for="item in vsData"
            :key="item.vsid"
            :label="item.content"
            :value="item.vsid"></el-option>
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
import {getEmpByType,postEmp,putEmp,getEmp} from '@/api/modules/emp';
import {getDepts} from '@/api/modules/dept';
import {getPoints} from '@/api/modules/point'
export default {
  data() {
    return {
      add:false,
      doctorData:[],
      deptData:[],
      vsData:[],
      jobOptions: [
        {
          value: "医生",
          label: "医生",
        },
        {
          value: "护士",
          label: "护士",
        },
      ],
      visible: false,
      dataForm: {
        uuid: null,
        name: "",
        job: "",
        mgr: null,
        hiredate: "",
        sal: "",
        deptno: null,
        vsid: ""
      },
      dataRule: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        job: [{ required: true, message: "不能为空", trigger: "blur" }],
        mgr: [{ required: true, message: "不能为空", trigger: "blur" }],
        hiredate: [{ required: true, message: "不能为空", trigger: "blur" }],
        sal: [{ required: true, message: "不能为空", trigger: "blur" }],
        deptname: [{ required: true, message: "不能为空", trigger: "blur" }],
        vsname: [{ required: true, message: "不能为空", trigger: "blur" }], 
      },
    };
  },
  created(){
    let typeDate={
      type:"staff"
    }
    getEmpByType(typeDate).then(resp=>{
      if(resp.status==200){
        this.doctorData=resp.data
        console.log(this.doctorData)
      }else{
        this.$message({
            message: "获取医护人员姓名失败！",
            type: "failed",
            duration: 1500,
            onClose: () => {
              
            },
        });
      }
    });
    getDepts().then(resp=>{
      if(resp.status==200){
        this.deptData=resp.data;
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
    getPoints().then(resp=>{
      if(resp.status==200){
        this.vsData=resp.data;
      }else{
        this.$message({
              message: "获取接种点信息失败！",
              type: "failed",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.dataForm = {};
                this.$emit("refreshDataList");
              },
        });
      }
    });
  },
  methods: {
    init(id,add) {
      if(typeof(id)!="undefined"&&id!=0){
        let req = {
         uuid:id
        }
        getEmp(req).then(resp=>{
          if(resp.status==200){
            this.dataForm=resp.data[0]
         }
        });
      }
      this.add = add
      this.visible = true;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(!this.add){
              putEmp(this.dataForm).then(resp => {
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
            postEmp(this.dataForm).then(resp => {
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
