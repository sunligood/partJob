<template>
  <div class="merchant-list">
    <div class="add-btn">
      <el-input style="width: 200px;height:32px" v-model="keywords" placeholder="输入关键字搜索" />
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod(0)"></el-table-column>
      <el-table-column align="center" label="商品图片" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt width="50px" height="50px" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prdName" label="商品名" width="180"></el-table-column>
      <el-table-column align="center" prop="price" label="价格"></el-table-column>
      <el-table-column align="center" prop="saleNum" label="数量"></el-table-column>
      <el-table-column align="center" prop="no" label="订单号"></el-table-column>
      <el-table-column align="center" prop="createdDate" label="交易时间"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MerchantProduct',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      keywords: '',
      userInfo: this.$store.state.userInfo,
      tableData: [],
      tableDataDefault: []
    }
  },
  created() {
    this.queryStorePrd()
  },
  methods: {
    indexMethod(index) {
      index = index + 1 + (this.currentPage - 1) * this.pageSize
      return index
    },
    // page fn
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 查询商品
    queryStorePrd() {
      this.$axios
        .post('/queryDeal', { storeName: this.userInfo.storeName })
        .then(res => {
          this.tableData = res.data
          this.tableDataDefault = res.data
        })
    }
  },
  watch: {
    keywords(key) {
      this.currentPage = 1
      this.tableData = []
      if (key == '') {
        this.tableData = this.tableDataDefault
        return
      }
      let newArr = []
      this.tableDataDefault.forEach(item => {
        if (JSON.stringify(item).indexOf(key) !== -1) {
          newArr.push(item)
        }
      })
      this.tableData = newArr
    }
  }
}
</script>
<style lang="scss">
.merchant-list {
  padding: 10px;
  .add-btn {
    padding: 15px;
    text-align: right;
    background-color: #fff;
  }
  .page {
    background-color: #fff;
    padding: 20px 0;
    text-align: right;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>