<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="GetReservation()"
      style="text-align: left">
      <el-form-item>
        <el-input
          v-model="dataForm.name"
          placeholder="请输入接种人姓名"
          clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="GetReservation()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">预约</el-button>
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
        prop="vat"
        header-align="center"
        align="center"
        label="适龄人群">
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
        prop="time"
        header-align="center"
        align="center"
        label="预约时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="ressuccessful"
        header-align="center"
        align="center"
        label="进度">
        <template slot-scope="scope">
            <span v-if="scope.row.ressuccessful == 0">正在预约</span>
            <span v-else-if="scope.row.ressuccessful==1">成功</span>
            <span v-else-if="scope.row.ressuccessful==-1">取消预约</span>
			<span v-else-if="scope.row.ressuccessful==2">接种成功</span>
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
            :disabled="scope.row.ressuccessful==2"
            @click="addOrUpdateHandle(scope.row)">取消</el-button>
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
    <resdialog
      v-if="addOrUpdateVisible"
      ref="ResDialog"></resdialog>
  </div>
</template>

<script>
import ResDialog from "../personal/resdialog.vue";
import {getReservations,getReservation,deleteReservation,updateReservation} from '@/api/modules/reservation'
import cookie from 'js-cookie'
export default {
  data() {
    return {
      dataForm: {
        name:"",
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
    "resdialog":ResDialog,
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
      getReservation(req).then(resp=> {
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
    GetReservation(){
        getReservation(this.dataForm).then(resp=>{
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
      console.log(id);
        if(typeof(id)=="undefined"){
            this.addOrUpdateVisible = true;
            this.$nextTick(() => {
                this.$refs.ResDialog.init(id);
            });
        }else{
            let req = {
                vsid : id.vsid,
                lot : id.lot,
                uuid :id.uuid,
                time: id.time,
                ressuccessful:-1
            }
            updateReservation(req).then(resp=>{
                if(resp.status==200){
                    this.$message({
                        message: resp.data,
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.visible = false;
                        },
                    });
                    this.getDataList();
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
    },
  },
}
</script>
