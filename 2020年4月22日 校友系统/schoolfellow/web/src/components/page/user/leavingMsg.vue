<template>
  <div class="leavingMsg">
    <vDetail></vDetail>
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
          <el-table-column align="center" prop="author" label="姓名" width="80"></el-table-column>
          <el-table-column align="center" prop="sex" label="性别"></el-table-column>
          <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
          <el-table-column align="center" prop="email" label="email"></el-table-column>
          <el-table-column align="center" prop="content" label="内容"></el-table-column>
          <el-table-column align="center" prop="createdDate" label="留言时间"></el-table-column>
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
    </div>
    <div class="btnBox">
      <el-button type="primary" @click="sendMsg()">添加留言</el-button>
    </div>
  </div>
</template>

<script>
import vDetail from './ccommon/classDetail'
import { badWords } from '../../../mock/data/badWords'
export default {
  components: {
    vDetail
  },
  data() {
    return {
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    indexMethod(index) {
      index = index + 1 + (this.currentPage - 1) * this.pageSize
      return index
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    // page fn
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    getTime() {
      //获取时间
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      let time =
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      return time
    },
    // 提交留言
    sendMsg() {
      this.$prompt('请输入留言内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        roundButton: true
      }).then(({ value }) => {
        let parms = {
          content: value,
          author: sessionStorage.getItem('name'),
          sex: sessionStorage.getItem('sex'),
          email: sessionStorage.getItem('email'),
          createdDate: this.getTime(),
          systems: sessionStorage.getItem('systems'),
          major: sessionStorage.getItem('major'),
          class: sessionStorage.getItem('class'),
          mobile: sessionStorage.getItem('mobile')
        }

        this.$axios.post('/addMessage', parms).then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: 'success',
              message: '新增成功！'
            })

            let req = {
              systems: sessionStorage.getItem('systems'),
              major: sessionStorage.getItem('major'),
              class: sessionStorage.getItem('class')
            }
            this.$axios.post('/queryMessage', req).then(res => {
              this.tableData = res.data.data
              for (let i = 0; i < this.tableData.length; i++) {
                for (let key in this.tableData[i]) {
                  if (key == 'content') {
                    let str = this.tableData[i][key]
                    if (str != null) {
                      this.tableData[i][key] = str.replace(badWords, function(
                        s
                      ) {
                        var str = ''
                        for (var i = 0; i < s.length; i++) {
                          str += '*'
                        }
                        return str
                      })
                    }
                  }
                }
              }
            })
          }
        })
      })
    }
  },
  created() {
    let parms = {
      systems: sessionStorage.getItem('systems'),
      major: sessionStorage.getItem('major'),
      class: sessionStorage.getItem('class')
    }
    this.$axios.post('/queryMessage', parms).then(res => {
      this.tableData = res.data.data
      for (let i = 0; i < this.tableData.length; i++) {
        for (let key in this.tableData[i]) {
          if (key == 'content') {
            let str = this.tableData[i][key]
            if (str != null) {
              this.tableData[i][key] = str.replace(badWords, function(s) {
                var str = ''
                for (var i = 0; i < s.length; i++) {
                  str += '*'
                }
                return str
              })
            }
          }
        }
      }
    })
  }
}
</script>
<style scoped>
.main {
  background-color: #fff;
  margin-top: 10px;
}
.tableBox {
  padding: 10px;
}
.page {
  background-color: #fff;
  padding: 10px;
  text-align: right;
}
.btnBox {
  margin-top: 200px;
  text-align: center;
}
</style>