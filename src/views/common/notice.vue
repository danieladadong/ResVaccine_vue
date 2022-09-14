<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getPublishNotice()"
      style="text-align: left"
    >
      <el-form-item>
        <el-select v-model="dataForm.type" placeholder="请选择类型">
          <el-option v-for="item in type" :key="item.name" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="dataForm.title" placeholder="请输入公告标题" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getPublishNotice()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="title"
        header-align="center"
        align="center"
        label="标题"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        header-align="center"
        align="center"
        label="发布人"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="content"
        header-align="center"
        align="center"
        label="内容"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="creates"
        header-align="center"
        align="center"
        label="创建日期"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="publish"
        header-align="center"
        align="center"
        label="是否发布"
      ></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.ntid)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.ntid)">删除</el-button>
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
    ></el-pagination> -->
    <!-- 弹窗, 新增 / 修改 -->
    <editnotice v-if="addOrUpdateVisible" ref="NoticeAddOrUpdate"></editnotice>
  </div>
</template>

<script>
import NoticeAddOrUpdate from './editnotice.vue';
import { getNotice, getNotices, deleteNotices } from '@/api/modules/notice'
import cookie from 'js-cookie'
export default {
  data() {
    return {
      dataForm: {
        title: "",
        type:''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      value: '',
      type: [
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
  components: {
    "editnotice": NoticeAddOrUpdate,
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getPublishNotice() {
      this.dataListLoading = true;
      getNotice(this.dataForm).then(resp => {
        if (resp.status == 200) {
          this.dataList = resp.data
          this.totalPage = this.dataList.length
        }
        this.dataListLoading = false;
      });
    },
    getDataList() {
      getNotices().then(resp => {
        if (resp.status == 200) {
          this.dataList = resp.data
          this.totalPage = this.dataList.length
        } else if (resp.status == 500) {
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
        this.$refs.NoticeAddOrUpdate.init(id);
      });
      this.getDataList()
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
          return item.ntid;
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
        ids.forEach(function (element) {
          deleteData['ntid'] = element;
          deleteNotices(deleteData).then(resp => {
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
};
</script>