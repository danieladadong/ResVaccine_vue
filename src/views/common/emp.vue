<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDoctorByName()"
      style="text-align: left">
      <el-form-item>
        <el-input
          v-model="dataForm.name"
          placeholder="请输入姓名"
          clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDoctorByName()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle(0,true)">新增</el-button>
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
        prop="name"
        header-align="center"
        align="center"
        label="医护姓名">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="job"
        header-align="center"
        align="center"
        label="职务类别">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="hiredate"
        header-align="center"
        align="center"
        label="入职时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="dname"
        header-align="center"
        align="center"
        label="所属医院">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="content"
        header-align="center"
        align="center"
        label="工作地点">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="loc"
        header-align="center"
        align="center"
        label="详细地址">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="sal"
        header-align="center"
        align="center"
        label="月薪">
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
            @click="addOrUpdateHandle(scope.row.uuid,false)">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.uuid)">删除</el-button>
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
    <editemp
      v-if="addOrUpdateVisible"
      ref="EmpAddOrUpdate"
      ></editemp>
  </div>
</template>

<script>
import EmpAddOrUpdate from "./editemp";
import {getEmpList,getEmp,deleteEmpByUUID} from '@/api/modules/emp'
export default {
  data() {
    return {
      dataForm: {
        name: "",
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
    "editemp":EmpAddOrUpdate,
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      getEmpList().then(resp=> {
        console.log(resp.data)
        if (resp.status == 200) {
          this.dataList = resp.data;
          this.totalPage = this.dataList.length
          // this.totalPage = data.page.totalCount;
        } else if(resp.status ==500) {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    getDoctorByName(){
        getEmp(this.dataForm).then(resp=>{
            if(resp.status==200){
              this.dataList=resp.data
              this.totalPage = this.dataList.length
            }else if(resp.status==500){
              this.dataList=[]
              this.totalPage=0
            }
            this.dataListLoading = false;
          });
    },
    reDataList(){
      this.dataForm=[];
      console.log(this.dataForm)
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
    addOrUpdateHandle(id,add) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.EmpAddOrUpdate.init(id,add);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.id;
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
        let deleteData = {};
        var that = this;
        ids.forEach(function(element){
          deleteData['uuid'] = element;
          deleteEmpByUUID(deleteData).then(resp => {
            if (resp.status == 200) {
              that.$message({
                message: resp.data,
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
}
</script>
