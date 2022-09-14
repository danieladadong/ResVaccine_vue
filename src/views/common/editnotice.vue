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
        v-model="dataForm.ntid"
        style="display: none"></el-input>
      <el-form-item label="标题" prop="title">
        <el-input
            v-model="dataForm.title"
            placeholder="请输入公告标题"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="发布人" prop="name">
        <el-select
        style="width: 100%"
        v-model="dataForm.uuid"
        placeholder="请选择发布人">
            <el-option
                v-for="item in empData"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="内容" prop="content">
          <el-input type="textarea"  v-model="dataForm.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="creates">
            <el-date-picker
                v-model="dataForm.creates"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择发布时间"
                style="width: 100%">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="发布" prop="publish">
        <el-select
            style="width: 100%"
            v-model="dataForm.publish"
            placeholder="请选择是否发布">
            <el-option
                v-for="item in trueData"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
            style="width: 100%"
            v-model="dataForm.type"
            placeholder="请选择类型">
            <el-option v-for="item in types" :key="item.name" :label="item.name" :value="item.type"></el-option>
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
import {getEmpList} from '@/api/modules/emp';
import {getNotice,updateNotices,addNotices} from '@/api/modules/notice'
export default {
  data() {
    return {
        empData:[],
        trueData:[
            {
                value: "是",
                label: "是",
            },
            {
                value: "否",
                label: "否",
            }
        ],
        dataForm: {
            ntid: 0,
            title: "",
            uuid: "",
            content: "",
            creates: "",
            publish: "",
            type:""
        },
        dataRule: {
            title: [{ required: true, message: "不能为空", trigger: "blur" }],
            uuid: [{ required: true, message: "不能为空", trigger: "blur" }],
            content: [{ required: true, message: "不能为空", trigger: "blur" }],
            creates: [{ required: true, message: "不能为空", trigger: "blur" }],
            publish: [{ required: true, message: "不能为空", trigger: "blur" }],
            type: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
        visible: false,
        types: [
        {
          name: '疫苗百科',
          type: 'vaccine',
          children: [
          ]
        },
        {
          name: '医院公告',
          type: 'notice',
          children: [
          ]
        }, {
          name: '重大新闻',
          type: 'new',
          children: [
          ]
        },
        {
          name: '医生科普',
          type: 'answer',
          children: [
          ]
        }
      ]
    };
  },
  created(){
    getEmpList().then(resp=>{
        if(resp.status==200){
            this.empData=resp.data;
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
  },
  methods: {
    init(id) {
        if(typeof(id)!="undefined"&&id!=0){
          console.log(id)
            let req = {
                ntid:id
            }
            getNotice(req).then(resp=>{
                if(resp.status==200){
                    this.dataForm=resp.data[0];
                }else{
                    this.$message({
                        message: resp.message,
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
        this.dataForm.deptno = id || 0;
        this.visible = true;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.dataForm.deptno!=0){
              updateNotices(this.dataForm).then(resp => {
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
            addNotices(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$parent.getDataList()
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
