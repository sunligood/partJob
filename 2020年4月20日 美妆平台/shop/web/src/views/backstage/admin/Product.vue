<template>
  <div class="admin-product">
    <div class="serach-btn">
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
      <el-table-column align="center" prop="storeName" label="店铺名" width="180"></el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          <span>{{scope.row.price}}/{{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="好评率">
        <template slot-scope="scope">
          <span>{{count(scope.row.favourable, scope.row.harmful)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="差评率">
        <template slot-scope="scope">
          <span>{{count(scope.row.harmful, scope.row.favourable)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createdDate" label="上架时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
        </template>
      </el-table-column>
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
  name: 'AdminProduct',
  data() {
    return {
      tableData: [],
      tableDataDefault: [],
      keywords: '',
      currentPage: 1,
      pageSize: 10
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
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确定下架此商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定操作
        this.$axios.post('/deletePrd', { prdID: row.prdID }).then(res => {
          this.$message({
            type: 'success',
            message: '下架成功！'
          })
          this.queryStorePrd()
        })
      })
    },
    queryStorePrd() {
      this.$axios.post('/queryPrd').then(res => {
        this.tableData = res.data
        this.tableDataDefault = res.data
      })
    },
    count(num1, num2) {
      if (num1 + num2 === 0) {
        return 0
      }
      return ((num1 / (num1 + num2)) * 100).toFixed(2) + '%'
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
<style lang="scss" scoped>
.admin-product {
  padding: 10px;
  .page {
    background-color: #fff;
    padding: 20px 0;
    text-align: right;
  }
  .serach-btn {
    padding: 15px;
    text-align: right;
    background-color: #fff;
  }
}
</style>