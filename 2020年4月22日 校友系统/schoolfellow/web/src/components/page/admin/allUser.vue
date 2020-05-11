<template>
  <div class="allUser">
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
      <el-input
        style="position: absolute;right: 59px;top: 33px;width: 200px;height:32px"
        v-model="search"
        placeholder="输入关键字搜索"
      />
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" width="50" type="index" :index="indexMethod(0)"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column align="center" prop="systems" label="系别"></el-table-column>
        <el-table-column align="center" prop="major" label="专业"></el-table-column>
        <el-table-column align="center" prop="class" label="班级"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
        <el-table-column align="center" prop="email" label="email"></el-table-column>
        <el-table-column align="center" prop="address" label="现住地址"></el-table-column>
        <el-table-column align="center" fixed="right" width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学号" prop="emp_no">
          <el-input v-model="form.emp_no" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="系别" prop="systems">
          <el-select v-model="form.systems" placeholder="请选择系别" @change="getChild(form.systems)">
            <el-option
              v-for="obj in  systemsList"
              :key="obj.code"
              :label="obj.name"
              :value="obj.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select v-model="form.major" placeholder="请选择专业">
            <el-option
              v-for="item in childList"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="form.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="form.email" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="现住地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入现住地址"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeUserInfo('ruleForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { sysList } from '../../../mock/data/sysList'
export default {
  data() {
    function checkPhone(rule, value, callback) {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('电话格式错误!'))
      } else {
        callback()
      }
    }
    function checkEmail(rule, value, callback) {
      if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
      ) {
        callback(new Error('邮箱格式错误!'))
      } else {
        callback()
      }
    }
    return {
      search: '',
      tableData: [],
      tableDataDefault: [],
      currentPage: 1,
      pageSize: 10,
      form: {
        systems: '',
        class: '',
        major: ''
      },
      dialogFormVisible: false,
      systemsList: [],
      childList: [],
      rules: {
        emp_no: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        systems: [{ required: true, message: '请选择系别', trigger: 'change' }],
        major: [{ required: true, message: '请选择专业', trigger: 'change' }],
        class: [{ required: true, message: '请选择班级', trigger: 'change' }],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    indexMethod(index) {
      index = index + 1 + (this.currentPage - 1) * this.pageSize
      return index
    },
    // 编辑按钮
    handleEdit(index, row) {
      this.dialogFormVisible = true
      this.form = row
      this.form.userID = row.userID
      this.form.root = 0
      for (let i = 0; i < this.systemsList.length; i++) {
        for (let key in this.systemsList[i]) {
          if (this.systemsList[i]['name'] == row.systems) {
            this.childList = this.systemsList[i]['child']
            return false
          }
        }
      }
    },
    // 编辑保存
    changeUserInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/updateStu', this.form).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
            } else {
              this.$message.error('修改失败！')
            }
          })
        }
      })
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('确定删除此用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定操作
          var parms = {
            userID: row.userID
          }
          this.$axios.post('/deleteStu', parms).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: 'success',
                message: '删除成功！'
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
      this.$axios.post('/queryStu').then(res => {
        this.tableData = res.data.data
      })
    },
    // 通过系别自动获取专业
    getChild(name) {
      let parentName = name
      this.tableData.major = ''
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
        this.$axios.post('/queryStu', this.form).then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data
          }
        })
      } else {
        this.$axios.post('/queryStu', this.form).then(res => {
          if (res.data.code == 1) {
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
          }
        })
      }
    }
  },
  created() {
    this.$axios.post('/queryStu').then(res => {
      this.tableData = res.data.data
      this.tableDataDefault = res.data.data
    })
  },
  mounted() {
    this.systemsList = sysList
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
.allUser {
  background-color: #fff;
  padding: 20px;
}
.page {
  background-color: #fff;
  margin-top: 20px;
  text-align: right;
}
.searchBox {
  padding-bottom: 20px;
}
.inputBox {
  width: 170px;
  display: inline-block;
  margin-right: 20px;
}
</style>