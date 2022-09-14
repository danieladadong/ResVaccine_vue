<template>
  <div class="mod-config">
      <el-form
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="getWHouse()"
        style="text-align: left">
        <el-form-item>
          <el-input
            v-model="dataForm.content"
            placeholder="请输入所属接种点名称"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getWHouse()">查询</el-button>
          <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
          <el-button
            type="danger"
            @click="deleteHandle()"
            :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
          label="生产厂商">
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
          prop="total"
          header-align="center"
          align="center"
          label="疫苗总库存">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="amount"
          header-align="center"
          align="center"
          label="疫苗可用数">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="date"
          header-align="center"
          align="center"
          label="入库时间">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="strange"
          header-align="center"
          align="center"
          label="保存条件"> 
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="cordon"
          header-align="center"
          align="center"
          label="疫苗告警线">
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row.vsid,scope.row.lot)">修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandle(scope.row.vsid,scope.row.lot)">删除</el-button>
          </template>
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
      <!-- 弹窗, 新增 / 修改 -->
      <editwh
        v-if="addOrUpdateVisible"
        ref="WHAddOrUpdate"
        ></editwh>
  </div>
</template>

<script>
import WHAddOrUpdate from './editwarehouse.vue';
import {getWareHouse,getWareHouses,deleteWareHouse} from '@/api/modules/warehouse'
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
    "editwh":WHAddOrUpdate,
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getWHouse(){
      this.dataListLoading = true;
      getWareHouse(this.dataForm).then(resp=>{
        if(resp.status==200){
          this.dataList = resp.data
          this.totalPage = this.dataList.length
        }
        this.dataListLoading = false;
      });
    },
    getDataList(){
        let vsids = cookie.get("vsid")
        let req={
          vsid:vsids
        }
        getWareHouse(req).then(resp=>{
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
    // 新增 / 修改
    addOrUpdateHandle(id,lot) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.WHAddOrUpdate.init(id,lot);
      });
      this.getDataList()
    },
    // 删除
    deleteHandle(id,lot) {
      
        var ids = id? [id]: this.dataListSelections.map((item) => {
            return item.vsid;
          });
      this.$confirm(
        `确定${id ? "删除" : "批量删除"}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        let deleteData = {}
        var that = this;
        var lots = lot
        ids.forEach(function(element){
            deleteData['vsid'] = element;
            deleteData['lot'] = lots
            deleteWareHouse(deleteData).then(resp=>{
              if (resp.status == 200) {
                that.$message({
                  message: resp.data,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                  },
                });
              } else {
                that.$message.error(resp.message);
              }
              that.getDataList();
          });
        });
        
      });
    },
  },
};
</script>