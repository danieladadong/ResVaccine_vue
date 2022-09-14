<template>
  <el-dialog
    v-if="visible"
    :title="this.title"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px">
      <el-form-item 
        label="批次号"
        prop="lot">
        <el-input
            :disabled="this.title!='新增'? true:false"
            v-model="dataForm.lot"
            placeholder="请输入批次号"
            style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="疫苗名称" prop="vaccine">
        <el-input
        style="width: 100%"
        v-model="dataForm.vaccine"
        placeholder="请输入疫苗名称"/>
      </el-form-item>
      <el-form-item label="生产厂商" prop="manufacture">
        <el-input
        style="width: 100%"
        v-model="dataForm.manufacture"
        placeholder="请输入生产厂商"/>
      </el-form-item>
      <el-form-item label="生产日期" prop="mfd">
            <el-date-picker
                v-model="dataForm.mfd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择生产日期"
                style="width: 100%">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="过期日期" prop="exp">
            <el-date-picker
                v-model="dataForm.exp"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择过期日期"
                style="width: 100%">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="产地" prop="address">
        <el-input
        style="width: 100%"
        v-model="dataForm.address"
        placeholder="请输入产地"/>
      </el-form-item>
      <el-form-item label="适龄人群" prop="vat">
        <el-input
        style="width: 100%"
        v-model="dataForm.vat"
        placeholder="请输入适龄人群"/>
      </el-form-item>
    <el-form-item label="说明书" prop="inserts">
        <el-input
        type="textarea"
        style="width: 100%"
        v-model="dataForm.inserts"
        placeholder="请输入说明书"/>
    </el-form-item>
    <el-form-item label="保存条件" prop="strange">
        <el-input
        type="textarea"
        style="width: 100%"
        v-model="dataForm.strange"
        placeholder="请输入保存条件"/>
    </el-form-item>
    <el-form-item label="疫苗类型" prop="strange">
        <el-select v-model="dataForm.type" style="width: 100%">
          <el-option v-for="item in options"
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
import {getVaccine,updateVaccine,addVaccine} from '@/api/modules/vaccines'
export default {
  data() {
    return {
        title:"修改",
        dataForm: {
            lot: "",
            vaccine: "",
            manufacture: "",
            mfd: "",
            exp: "",
            address: "",
            vat: "",
            inserts: "",
            strange: "",
            type:""
        },
        dataRule: {
            lot: [{ required: true, message: "不能为空", trigger: "blur" }],
            vaccine: [{ required: true, message: "不能为空", trigger: "blur" }],
            manufacture: [{ required: true, message: "不能为空", trigger: "blur" }],
            mfd: [{ required: true, message: "不能为空", trigger: "blur" }],
            exp: [{ required: true, message: "不能为空", trigger: "blur" }],
            address: [{ required: true, message: "不能为空", trigger: "blur" }],
            vat: [{ required: true, message: "不能为空", trigger: "blur" }],
            inserts: [{ required: true, message: "不能为空", trigger: "blur" }],
            strange: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
        visible: false,
        options: [{
          value: 'adult',
          label: '成人疫苗'
        }, {
          value: 'kid',
          label: '儿童疫苗'
        }],
    };
  },
  created(){
      
  },
  methods: {
    init(id) {
        if(id=="add"){
          this.title = "新增"
          this.dataForm.lot = "";
          this.visible = true;
        }else{
          this.title = "修改"
          if(typeof(id)!="undefined"&&id!=0){
            let req = {
                lot:id
            }
            getVaccine(req).then(resp=>{
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
        this.dataForm.lot = id || 0;
        this.visible = true;
        }
        
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.title=="修改"){
              updateVaccine(this.dataForm).then(resp => {
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
            addVaccine(this.dataForm).then(resp => {
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
