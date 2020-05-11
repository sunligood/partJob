<template>
  <div class="userClass">
    <vDetail></vDetail>
    <div class="main">
      <div class="tableBox">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            label="序号"
            width="50"
            type="index"
            :index="indexMethod(1)"
          ></el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="80"></el-table-column>
          <el-table-column align="center" prop="systems" label="系别"></el-table-column>
          <el-table-column align="center" prop="major" label="专业"></el-table-column>
          <el-table-column align="center" prop="class" label="班级"></el-table-column>
          <el-table-column align="center" prop="sex" label="性别"></el-table-column>
          <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
          <el-table-column align="center" prop="email" label="email"></el-table-column>
          <el-table-column align="center" prop="address" label="现住地址"></el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="userDetail(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>-->
      </div>
    </div>

    <el-dialog title="个人详情" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="头像">
          <img :src="form.image" alt width="100" height="100" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.emp_no" :disabled="isDisabled" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" :disabled="isDisabled" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" :disabled="isDisabled" label="男">男</el-radio>
          <el-radio v-model="form.sex" :disabled="isDisabled" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="系别">
          <el-select
            v-model="form.systems"
            :disabled="isDisabled"
            placeholder="请选择系别"
            @change="getChild(form.systems)"
          >
            <el-option
              v-for="obj in  systemsList"
              :key="obj.code"
              :label="obj.name"
              :value="obj.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="form.major" :disabled="isDisabled" placeholder="请选择专业">
            <el-option
              v-for="item in childList"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.class" :disabled="isDisabled" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" :disabled="isDisabled" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="form.email" :disabled="isDisabled" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="现住地址">
          <el-input v-model="form.address" :disabled="isDisabled" placeholder="请输入现住地址"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="form.hobby" :disabled="isDisabled" placeholder="请输入爱好"></el-input>
        </el-form-item>
        <el-form-item label="个人说明">
          <el-input
            type="textarea"
            v-model="form.explains"
            :disabled="isDisabled"
            placeholder="请输入个人说明"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>-->
    </el-dialog>
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
      currentPage: 5,
      pageSize: 10,
      dialogFormVisible: false,
      form: [],
      isDisabled: true
    }
  },
  methods: {
    indexMethod(index) {
      return index++
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    // page fn
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    userDetail(index, row) {
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
    })
  }
}
</script>
<style scoped>
.main {
  background-color: #fff;
  margin-top: 10px;
}
.page {
  background-color: #fff;
  padding: 10px;
  text-align: right;
}
.tableBox {
  padding: 10px;
}
</style>