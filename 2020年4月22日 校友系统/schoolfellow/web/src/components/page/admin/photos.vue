<template>
  <div class="photos">
    <div class="searchBox">
      <div class="inputBox">
        <el-select v-model="form.systems" placeholder="请选择系别" @change="getChild(form.systems)">
          <el-option
            v-for="obj in  systemsList"
            :key="obj.code"
            :label="obj.name"
            :value="obj.name"
          ></el-option>
        </el-select>
      </div>
      <div class="inputBox">
        <el-select v-model="form.major" placeholder="请选择专业">
          <el-option
            v-for="item in childList"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div class="inputBox">
        <el-input v-model="form.class" placeholder="请输入班级"></el-input>
      </div>

      <el-button type="primary" @click="searchFn('search')">查询</el-button>
      <el-button type="primary" @click="searchFn('return')">重置</el-button>
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod(0)"></el-table-column>
        <el-table-column align="center" prop="name" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.url" width="50" height="50" alt />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="class" label="班级">
          <template slot-scope="scope">
            <span>{{scope.row.systems}}</span>
            <span>{{scope.row.major}}</span>
            <span>{{scope.row.class}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createdDate" label="发布时间"></el-table-column>
        <el-table-column align="center" prop="author" label="发布人"></el-table-column>
        <el-table-column align="center" fixed="right" width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fotter">
      <div class="btnBox">
        <el-button type="primary" @click="deleteMore()">批量删除</el-button>
      </div>
      <div class="pageBox">
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
  </div>
</template>

<script>
import { sysList } from '../../../mock/data/sysList'
export default {
  data() {
    return {
      input: '',
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      systemsList: [],
      childList: [],
      form: {
        systems: '',
        class: '',
        major: ''
      }
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
    // 删除
    handleDelete(index, row) {
      this.$confirm('确定删除此照片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定操作
          this.$axios
            .post('/deleteClassAlbum', { imgID: [row.imgID] })
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
                this.flushTable()
              }
            })
        })
        .catch(() => {
          // 取消操作
        })
    },
    //批量删除
    deleteMore() {
      let getListArr = this.$refs.multipleTable.selection
      let idArr = []
      for (let i = 0; i < getListArr.length; i++) {
        for (let key in getListArr[i]) {
          if (key == 'imgID') {
            idArr.push(getListArr[i][key])
          }
        }
      }
      this.$confirm('确定删除这些用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定操作
          this.$axios.post('/deleteClassAlbum', { imgID: idArr }).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.flushTable()
            }
          })
        })
        .catch(() => {
          // 取消操作
        })
    },
    // page fn
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    flushTable() {
      this.$axios.post('/queryClassAlbum', {}).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data
        }
      })
    },
    // 通过系别自动获取专业
    getChild(name) {
      let parentName = name
      this.form.major = ''
      for (let i = 0; i < this.systemsList.length; i++) {
        for (let key in this.systemsList[i]) {
          if (this.systemsList[i]['name'] == parentName) {
            this.childList = this.systemsList[i]['child']
            return false
          }
        }
      }
    },
    searchFn(type) {
      this.currentPage = 1
      if (type == 'return') {
        // 重置
        this.form = {
          systems: '',
          major: '',
          class: ''
        }
        this.childList = []
        this.$axios.post('/queryClassAlbum', this.form).then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data
          }
        })
      } else {
        this.$axios.post('/queryClassAlbum', this.form).then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data
          }
        })
      }
    }
  },
  created() {
    this.$axios.post('/queryClassAlbum', {}).then(res => {
      if (res.data.code == 1) {
        this.tableData = res.data.data
      }
    })
  },
  mounted() {
    this.systemsList = sysList
  }
}
</script>
<style scoped>
.photos {
  background-color: #fff;
  padding: 20px;
}
.fotter {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.searchBox {
  padding-bottom: 20px;
}
.inputBox {
  width: 200px;
  display: inline-block;
  margin-right: 20px;
}
</style>