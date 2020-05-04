<template>
  <div class="admin-user">
    <div class="serach-btn">
      <el-input style="width: 200px;height:32px" v-model="keywords" placeholder="输入关键字搜索" />
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod(0)"></el-table-column>
      <el-table-column align="center" prop="userName" label="用户名"></el-table-column>
      <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
      <el-table-column align="center" prop="address" label="收货地址"></el-table-column>
      <el-table-column align="center" prop="isAuthority" label="购物权限">
        <template slot-scope="scope">
          <span>{{scope.row.isAuthority === '1' ? '是' : '否'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">设置权限</el-button>
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
      isAuthority: true,
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
      let tips = ''
      let isAuthority = ''
      if (row.isAuthority === '1') {
        tips = '确认删除购物权限？'
        isAuthority = '0'
      } else {
        tips = '确认恢复购物权限？'
        isAuthority = '1'
      }
      this.$confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定操作
        this.$axios
          .post('/updateUser', { userID: row.userID, isAuthority: isAuthority })
          .then(res => {
            this.$message({
              type: 'success',
              message: '设置成功'
            })
            this.queryStorePrd()
          })
      })
    },
    queryStorePrd() {
      this.$axios.post('/queryUser').then(res => {
        this.tableData = res.data
        this.tableDataDefault = res.data
      })
    },
    count(num1, num2) {
      if (num1 + num2 === 0) {
        return 0
      }
      return (num1 / (num1 + num2)) * 100 + '%'
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
.admin-user {
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