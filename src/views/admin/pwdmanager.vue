<template>
  <div class="mod-config">
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
          prop="uuid"
          header-align="center"
          align="center"
          label="uuid">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="account"
          header-align="center"
          align="center"
          label="账号">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="password"
          header-align="center"
          align="center"
          label="密码">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="type"
          header-align="center"
          align="center"
          label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='admin'">管理员</span>
            <span v-else-if="scope.row.type=='staff'">工作人员</span>
            <span v-else-if="scope.row.type=='customer'">用户</span>
          </template>
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
              @click="UpdateHandle(scope.row.uuid)">修改</el-button>
          </template>
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
      <!-- 弹窗, 新增 / 修改 -->
      <updatepwd v-if="visable" ref="UpdatePwd"></updatepwd>

      <!-- 弹窗, 新增 / 修改 -->
      

  </div>
</template>

<script>
import {getAllUser} from '@/api/modules/user'
import UpdatePwd from '@/views/admin/updatepwd'
import cookie from 'js-cookie'
import Updatepwd from './updatepwd.vue';
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      visable: false
    };
  },

  created() {
    this.getDataList();
  },
  components: {
    "updatepwd":UpdatePwd
  },
  methods: {
    // 获取数据列表
    getDataList(){
        getAllUser().then(resp=>{
            if(resp.status==200){
                this.dataList = resp.data
            }
        })
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
    UpdateHandle(id){
        this.visable = true;
        this.$nextTick(() => {
        this.$refs.UpdatePwd.init(id);
      });
    }
  },
};
</script>
