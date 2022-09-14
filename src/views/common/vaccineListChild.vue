<template>
  <div class="mod-config">
      <el-form
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="GetVaccine()"
        style="text-align: left">
        <el-form-item>
          <el-input
            v-model="dataForm.vaccine"
            placeholder="请输入疫苗名称"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="GetVaccine()">查询</el-button>
            <el-button type="primary"  @click="goVaccine()">预约</el-button>

        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%">
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="lot"
          header-align="center"
          align="center"
          label="批次号">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="vaccine"
          header-align="center"
          align="center"
          label="名称">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="manufacture"
          header-align="center"
          align="center"
          label="生产商">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mfd"
          header-align="center"
          align="center"
          label="生产日期">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="exp"
          header-align="center"
          align="center"
          label="过期日期">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="exp"
          header-align="center"
          align="center"
          label="过期日期">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="address"
          header-align="center"
          align="center"
          label="产地">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="vat"
          header-align="center"
          align="center"
          label="适龄人群">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="inserts"
          header-align="center"
          align="center"
          label="说明书">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="strange"
          header-align="center"
          align="center"
          label="保存条件">
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination> -->
    <resdialog v-if="isShow" ref="ResDialog"></resdialog>
  </div>
</template>

<script>
import VaccineAddOrUpdate from './editvaccine.vue';
import {getVaccine,getVaccines,deleteVaccine,KidVaccine} from '@/api/modules/vaccines'
import ResDialog from "../personal/resdialog.vue";
import cookie from 'js-cookie'
export default {
  data() {
    return {
      dataForm: {
        vaccine: "",
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      isShow: false
    };
  },
  components: {
    "editvaccine": VaccineAddOrUpdate,
    "resdialog":ResDialog,
  },
  created() {
    this.getDataList();
  },
  methods: {
     goVaccine(id) {
      // console.log(id);
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.ResDialog.init();
      });
    },
    // 获取数据列表
    GetVaccine(){
      this.dataListLoading = true;
      getVaccine(this.dataForm).then(resp=>{
        if(resp.status==200){
          this.dataList = resp.data
          this.totalPage = this.dataList.length
        }
        this.dataListLoading = false;
      });
    },
    getDataList(){
       let req={
          type:"kid"
        }
        KidVaccine(req).then(resp=>{
          if(resp.status==200){
            this.dataList = resp.data
            this.totalPage = this.dataList.length
          }else if(resp.status ==500) {
            this.dataList = [];
            this.totalPage = 0;
          }
            this.dataListLoading = false;
        });
      },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
  },
};
</script>
