<template>
  <div class="mod-config">
      <el-form
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="GetPoint()"
        style="text-align: left">
        <el-form-item>
          <el-input
            v-model="dataForm.content"
            placeholder="请输入接种点名称"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="GetPoint()">查询</el-button>
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
          prop="content"
          header-align="center"
          align="center"
          label="接种点名称">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="address"
          header-align="center"
          align="center"
          label="接种点地址">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="working"
          header-align="center"
          align="center"
          label="工作时间">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="synopsis"
          header-align="center"
          align="center"
          label="简介">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
  </div>
</template>

<script>
import {getPoints,getPoint,addPoints,updatePoints,deletePoints} from '@/api/modules/point';
import cookie from 'js-cookie'
export default {
  data() {
    return {
      dataForm: {
        content: "",
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
    };
  },
  components: {
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    GetPoint(){
      this.dataListLoading = true;
      getPoint(this.dataForm).then(resp=>{
        if(resp.status==200){
          this.dataList = resp.data
          this.totalPage = this.dataList.length
        }
        this.dataListLoading = false;
      });
    },
    getDataList(){
        // let vsid = cookie.get("vsid")
        getPoints().then(resp=>{
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