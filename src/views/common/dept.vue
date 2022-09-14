<template>
  <div class="mod-config">
      <el-form
        :inline="true"
        :model="dataForm"
        @keyup.enter.native="getDeptByName()"
        style="text-align: left">
        <el-form-item>
          <el-input
            v-model="dataForm.dname"
            placeholder="请输入部门名"
            clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDeptByName()">查询</el-button>
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
          prop="dname"
          header-align="center"
          align="center"
          label="部门名">
        </el-table-column>
        <el-table-column
          prop="loc"
          header-align="center"
          align="center"
          label="部门地点">
        </el-table-column>
        <el-table-column
          prop="deptnum"
          header-align="center"
          align="center"
          label="部门人数">
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
              @click="addOrUpdateHandle(scope.row.deptno)">修改</el-button>
            <el-button
              type="text"
              size="small"
              @click="deleteHandle(scope.row.deptno)">删除</el-button>
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
      <editdept
        v-if="addOrUpdateVisible"
        ref="DeptAddOrUpdate"
        ></editdept>
  </div>
</template>

<script>
import DeptAddOrUpdate from './editdept.vue';
import {getDepts,getDept,deleteDeptByDeptno} from '@/api/modules/dept'
export default {
  data() {
    return {
      dataForm: {
        dname: "",
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
    "editdept":DeptAddOrUpdate,
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDeptByName(){
      this.dataListLoading = true;
      getDept(this.dataForm).then(resp=>{
        if(resp.status==200){
          this.dataList = resp.data
          this.totalPage = this.dataList.length
        }
        this.dataListLoading = false;
      });
    },
    getDataList(){
        getDepts().then(resp=>{
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
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.DeptAddOrUpdate.init(id);
      });
      this.getDataList()
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.deptno;
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
        ids.forEach(function(element){
            deleteData['deptno'] = element;
            deleteDeptByDeptno(deleteData).then(resp=>{
              if (resp.status == 200) {
                that.$message({
                  message: resp.message,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                  },
                });
                that.getDataList();
              } else {
                that.$message.error(resp.message);
              }
          });
        });
        
      });
    },
  },
};
</script>