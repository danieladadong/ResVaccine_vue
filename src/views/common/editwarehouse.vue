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
      label-width="100px">
      <el-input
        v-model="dataForm.vsid"
        style="display: none"></el-input>
      <el-form-item label="疫苗批次号" prop="lot">
        <el-input
            v-if="dataForm.vsid!=0"
            v-model="dataForm.lot"
            placeholder="请输入疫苗批次号"
            style="width: 100%"></el-input>
        <el-select
          v-else
          v-model="dataForm.lot"
          placeholder="请选择疫苗"
          style="width: 100%">
          <el-option
            v-for="item in lotdatalist"
            :key="item.lot"
            :label="item.vaccine"
            :value="item.lot"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="疫苗总库存" prop="total">
        <el-input-number v-model="dataForm.total" placeholder="请输入疫苗总库存"></el-input-number>
      </el-form-item>
      <el-form-item label="疫苗可用数" prop="amount">
        <el-input-number v-model="dataForm.amount" placeholder="请输入疫苗可用数"></el-input-number>
      </el-form-item>
      <el-form-item label="入库时间" prop="date">
        <el-date-picker
          v-model="dataForm.date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请输入入库时间"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="保存条件" prop="strange">
        <el-input v-model="dataForm.strange" placeholder="请输入保存条件"></el-input>
      </el-form-item>
      <el-form-item label="疫苗告警线" prop="cordon">
        <el-input-number v-model="dataForm.cordon" placeholder="请输入疫苗告警线"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getVaccines} from '@/api/modules/vaccines'
import {getOneWHVaccine,updateWareHouse,addWareHouse} from '@/api/modules/warehouse'
export default {
  data() {
    return {
        lotdatalist:[],
        dataForm: {
            vsid: 0,
            lot: "",
            total: "",
            amount: "",
            date: "",
            strange: "",
            isnew: 0,
            cordon:0
        },
        dataRule: {
            lot: [{ required: true, message: "不能为空", trigger: "blur" }],
            total: [{ required: true, message: "不能为空", trigger: "blur" }],
            amount: [{ required: true, message: "不能为空", trigger: "blur" }],
            date: [{ required: true, message: "不能为空", trigger: "blur" }],
            isnew: [{ required: true, message: "不能为空", trigger: "blur" }],
            strange: [{ required: true, message: "不能为空", trigger: "blur" }],
            cordon: [{ required: true, message: "不能为空", trigger: "blur" }]
        },
        visible: false,
    };
  },
  created(){
        
  },
  methods: {
    init(id,lots) {
        if(typeof(id)!="undefined"&&id!=0&&lots!=null){
            let req = {
                vsid:id,
                lot:lots
            }
            getOneWHVaccine(req).then(resp=>{
                if(resp.status==200){
                    this.dataForm=resp.data;
                }else{
                    this.$message({
                        message: resp.data,
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
        getVaccines().then(resp=>{
          if(resp.status==200){
            this.lotdatalist=resp.data;
          }
        })
        this.dataForm.visd = id || 0;
        this.visible = true;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            if(this.dataForm.vsid!=0){
              updateWareHouse(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.data,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                  },
                });
                this.$parent.getDataList()
              } else {
                this.$message.error(resp.message);
              }
            });
          }else{
            this.dataForm.vsid=1
            addWareHouse(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.data,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                  },
                });
                this.$parent.getDataList();
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
