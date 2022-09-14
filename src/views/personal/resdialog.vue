<template>
  <el-dialog :visible.sync="visible">
      <el-form
        :inline="true"
        :model="checkData"
        @click="check()"
        label-width="300px"
        style="text-align: left;">
        <el-form-item label="是否对疫苗的活性成分过敏，或以前接种同类疫苗时出现过敏?">
          <el-select v-model="checkData.one">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="既往发生过疫苗严重过敏反应?">
          <el-select v-model="checkData.two">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患有未控制的癫痫和其他严重神经系统疾病?">
          <el-select v-model="checkData.three">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正在发热，患急性疾病，慢性疾病的急性发作期，未控制的严重慢性病患">
          <el-select v-model="checkData.four">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="妊娠期妇女?">
          <el-select v-model="checkData.five">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
     <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="check()">确定</el-button>
    </div>
    <el-dialog
    append-to-body
    v-if="innerVisible"
    :title="新增"
    :close-on-click-modal="false"
    :visible.sync="innerVisible">
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="100px">
      <el-form-item label="接种点名称" prop="vsid">
        <el-select
            v-model="dataForm.vsid"
            placeholder="请选择接种点"
            style="width: 100%">
            <el-option
                v-for="item in pointData"
                :key="item.vsid"
                :label="item.content"
                :value="item.vsid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="疫苗名称" prop="lot">
        <el-select 
            v-model="dataForm.lot"
            placeholder="请选择疫苗"
            style="width:100%">
            <el-option
                v-for="item in vaccineData"
                :key="item.lot"
                :label="item.vaccine"
                :value="item.lot"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约时间" prop="time">
        <!-- <el-input v-model="dataForm.inTime" placeholder=""></el-input> -->
        <el-date-picker
          v-model="dataForm.time"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="预约接种时间"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false;visible=false;">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
  </el-dialog>
</template>

<script>
import {getReservation,addReservation,updateReservation} from '@/api/modules/reservation';
import {getPoints} from '@/api/modules/point';
import {getVaccines} from '@/api/modules/vaccines';
import {getAdultWareHouseVaccines,getKidWareHouseVaccines,getWareHouse} from '@/api/modules/warehouse'
import cookie from 'js-cookie'
export default {
  data() {
    return {
        innerVisible: false,
        pointData:[],
        vaccineData:[],
        checkData:{
            one:"",
            two:"",
            three:"",
            four:"",
            five:""
        },
        dataForm: {
            vsid: null,
            lot:"",
            uuid: cookie.get("uuid"),
            time: "",
            ressuccessful:0
        },
        dataRule: {
            dname: [{ required: true, message: "不能为空", trigger: "blur" }],
            loc: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
        visible: false,
    };
  },
  created(){
        getPoints().then(resp=>{
            if(resp.status==200){
                    this.pointData=resp.data;
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
  watch:{
    dataForm:{
      handler: function(val){
        let type = cookie.get("type");
        if(type=='staff'){

        }else if(type=='admin'){

        }else{
          let url = this.$route.path
          if(url==='/vaccineList'){
            let req={
              vsid:val.vsid
            }
            getAdultWareHouseVaccines(req).then(resp=>{
                if(resp.status==200){
                  console.log(resp.data)
                    this.vaccineData=resp.data;
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
          }else if(url==='/vaccineListChild'){
            let req={
              vsid:val.vsid
            }
            getKidWareHouseVaccines(req).then(resp=>{
                if(resp.status==200){
                  console.log(resp.data)
                    this.vaccineData=resp.data;
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
          }else{
            let req={
              vsid:val.vsid
            }
            getWareHouse(req).then(resp=>{
                if(resp.status==200){
                  console.log(resp.data)
                    this.vaccineData=resp.data;
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
        }
      },
      deep:true
    }
  },
  methods: {
    init(item) {
        this.visible = true;
    },
    check(){
        var tag = false;
        for(var k in this.checkData){
          if(this.checkData[k]==="是"){
            tag=true;
          }else{
            tag=false;
          }
        }
        if(!tag){
          this.$message({
            message: "您可以接种",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            },
          });
          this.innerVisible = true;
          return true;
        }else{
          this.$message({
            message: "您不适合接种",
            type: "failed",
            duration: 1500,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            },
          });
          return false;
        }   
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
            addReservation(this.dataForm).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  message: resp.data,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.innerVisible = false;
                    this.$emit("refreshDataList");
                  },
                  
                });
                this.$parent.getDataList();
              }else{
                this.$message.error(resp.message);
              }
            });
          }
      });
    },
  },
};
</script>
