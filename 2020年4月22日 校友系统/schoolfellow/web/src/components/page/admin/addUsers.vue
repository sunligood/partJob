<template>
  <div class="addUsers">
    <div class="formBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学号" prop="emp_no">
          <el-input v-model="ruleForm.emp_no" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="男" checked>男</el-radio>
          <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="系别" prop="systems">
          <el-select
            v-model="ruleForm.systems"
            placeholder="请选择系别"
            @change="getChild(ruleForm.systems)"
          >
            <el-option
              v-for="obj in  systemsList"
              :key="obj.code"
              :label="obj.name"
              :value="obj.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select v-model="ruleForm.major" placeholder="请选择专业">
            <el-option
              v-for="item in childList"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="ruleForm.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="现住地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入现住地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      systemsList: [],
      childList: [],
      ruleForm: {
        emp_no: '',
        name: '',
        sex: '男',
        systems: '',
        major: '',
        class: '',
        mobile: '',
        email: '',
        address: '',
        root: 0,
        password: '123456'
      },
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm)
        if (valid) {
          this.$axios.post('/addStu', this.ruleForm).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: '注册成功！',
                type: 'success'
              })
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getChild(name) {
      let parentName = name
      this.ruleForm.major = ''
      for (let i = 0; i < this.systemsList.length; i++) {
        for (let key in this.systemsList[i]) {
          if (this.systemsList[i]['name'] == parentName) {
            this.childList = this.systemsList[i]['child']
            return false
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    this.systemsList = sysList
  }
}
</script>
<style scoped>
.addUsers {
  padding: 20px;
  background-color: #fff;
}
.formBox {
  width: 50%;
}
</style>