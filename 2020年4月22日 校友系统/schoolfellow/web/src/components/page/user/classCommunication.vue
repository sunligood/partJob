<template>
  <div class="classCommunication">
    <vDetail></vDetail>
    <el-input
      style="position: absolute;right: 27px;top: 20px;width: 200px;"
      v-model="search"
      placeholder="输入关键字搜索"
    />
    <div class="main">
      <div class="tableBox">
        <el-table
          :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            label="序号"
            width="50"
            type="index"
            :index="indexMethod(0)"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="80"></el-table-column>
          <el-table-column align="center" prop="sex" label="性别"></el-table-column>
          <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
          <el-table-column align="center" prop="email" label="email"></el-table-column>
          <el-table-column align="center" prop="address" label="现住址"></el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <el-dialog title="个人详情" :visible.sync="dialogFormVisible">
        <div class="user-box">
          <div style="text-align:center">
            <img v-if="!userData.image" src="../../../assets/img/avatar.png" alt />
            <img v-else :src="userData.image" alt style="border-radius: 50%;" />
          </div>
          <p>学号：{{userData.emp_no}}</p>
          <p>姓名：{{userData.name}}</p>
          <p>电话：{{userData.mobile}}</p>
          <p>爱好：{{userData.hobby != null ? userData.hobby : '无'}}</p>
          <p>个人说明：{{userData.explains != null ? userData.explains : '无'}}</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import vDetail from './ccommon/classDetail'
export default {
  components: {
    vDetail
  },
  data() {
    return {
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      dialogFormVisible: false,
      userData: {}
    }
  },
  methods: {
    // 用户详情
    userDetail(index, row) {
      console.log(row)
      this.dialogFormVisible = true
      this.userData = row
    },
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
    }
  },
  created() {
    let parms = {
      systems: sessionStorage.getItem('systems'),
      major: sessionStorage.getItem('major'),
      class: sessionStorage.getItem('class')
    }
    this.$axios.post('/queryStu', parms).then(res => {
      this.tableData = res.data.data
      this.tableDataDefault = res.data.data
    })
  },
  watch: {
    search(key) {
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
<style scoped>
.main {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
}
.searchBox {
  padding-bottom: 20px;
}
.inputBox {
  width: 200px;
  display: inline-block;
  margin-right: 20px;
}
.tableBox {
  background-color: #fff;
}
.user-box {
  margin: 0 auto;
  width: 200px;
}
.user-box img {
  width: 100px;
  height: 100px;
}
.user-box p {
  padding: 5px 0;
  word-break: break-all;
}
.page {
  margin-top: 10px;
  background-color: #fff;
  text-align: right;
}
</style>