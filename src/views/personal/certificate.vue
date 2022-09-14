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
        prop="name"
        header-align="center"
        align="center"
        label="接种人">
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
        label="疫苗名称">
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
        prop="content"
        header-align="center"
        align="center"
        label="接种点名称">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="interval"
        header-align="center"
        align="center"
        label="间隔时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="dose"
        header-align="center"
        align="center"
        label="接种剂次">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import {getCertificate} from '@/api/modules/certificate'
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
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let req={
          uuid: cookie.get("uuid")
      }
      getCertificate(req).then(resp=> {
        if (resp.status == 200) {
          this.dataList = resp.data;
          this.totalPage = this.dataList.length
        } else if(resp.status ==500) {
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
}
</script>
