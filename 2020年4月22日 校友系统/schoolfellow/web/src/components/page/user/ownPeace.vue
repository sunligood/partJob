<template>
  <div class="ownPeace">
    <div class="title">个人简介</div>
    <div class="imgMainBox">
      <div class="img">
        <img v-if="imageUrl != 'null'" :src="imageUrl" alt />
        <!-- <el-button type="primary" v-show="isEdit">上传头像</el-button> -->
      </div>
      <!-- <el-upload
      class="avatar-uploader"
      action="/personalImg"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      v-show="isEdit"
      :data="uploadData"
    >
      <el-button size="small" type="primary" class="uploadBtn">点击上传</el-button>-->
      <div class="uploadBox">
        <el-upload
          class="upload-demo"
          drag
          action="/personalImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          multiple
          v-show="isEdit"
          :data="uploadData"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <!-- </el-upload> -->

    <div class="formBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="学号" prop="studentNo">
          <el-input v-model="ruleForm.emp_no" :disabled="disabledTrue" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" :disabled="disabledTrue" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex" :disabled="disabledTrue" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="系别" prop="systems">
          <el-select
            v-model="ruleForm.systems"
            placeholder="请选择系别"
            @change="getChild(ruleForm.systems)"
            :disabled="disabledTrue"
          >
            <el-option
              v-for="obj in  systemsList"
              :key="obj.code"
              :label="obj.name"
              :value="obj.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major" :disabled="disabledTrue">
          <el-select v-model="ruleForm.major" placeholder="请选择专业" :disabled="disabledTrue">
            <el-option
              v-for="item in childList"
              :key="item.code"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="ruleForm.class" placeholder="请输入班级" :disabled="disabledTrue"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="ruleForm.mobile" :disabled="isDisabled" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="ruleForm.email" :disabled="isDisabled" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="现住地址" prop="address">
          <el-input v-model="ruleForm.address" :disabled="isDisabled" placeholder="请输入现住地址"></el-input>
        </el-form-item>
        <el-form-item label="爱好" prop="hobby">
          <el-input v-model="ruleForm.hobby" :disabled="isDisabled" placeholder="请输入爱好"></el-input>
        </el-form-item>
        <el-form-item label="个人说明" prop="explains">
          <el-input
            type="textarea"
            v-model="ruleForm.explains"
            :disabled="isDisabled"
            placeholder="请输入个人说明"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-show="!isEdit" @click="changStatus('edit')">编辑个人信息</el-button>
          <el-button type="primary" v-show="isEdit" @click="submitForm('ruleForm')">保存个人信息</el-button>
          <el-button v-show="isEdit" @click="changStatus('cancel')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sysList } from '../../../mock/data/sysList' // 系别库
import bus from '../../../components/common/bus'
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
      ruleForm: {},
      defaultForm: {},
      isDisabled: true,
      disabledTrue: true,
      isEdit: false,
      systemsList: [],
      childList: [],
      imageUrl: null,
      uploadData: {},
      rules: {
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
    changStatus(status) {
      switch (status) {
        case 'edit':
          this.isEdit = true
          this.isDisabled = false
          break
        case 'cancel':
          this.isEdit = false
          this.isDisabled = true
          break
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.root = 0
          this.ruleForm.userID = sessionStorage.getItem('userID')
          delete this.ruleForm.image

          this.$axios.post('/updateStu', this.ruleForm).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.isEdit = false
              this.isDisabled = true

              for (let key in this.defaultForm) {
                for (let key2 in this.ruleForm) {
                  if (key == key2) {
                    if (this.defaultForm[key] != this.ruleForm[key2]) {
                      console.log(key, this.ruleForm[key2], 1111)
                      sessionStorage.setItem(key, this.ruleForm[key2])
                    }
                  }
                }
              }
            } else {
              this.$message.error('修改失败！')
            }
          })
        }
      })
    },
    setDatas(newObj, oldObj) {
      for (let key in oldObj) {
        for (let key2 in newObj) {
          if (key == key2) {
            if (oldObj[key] != newObj[key2]) {
              console.log(key, newObj[key2], 1111)
              sessionStorage.setItem(key, newObj[key2])
            }
          }
        }
      }
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
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 1) {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.imageUrl = URL.createObjectURL(file.raw)
        bus.$emit('changeImg', this.imageUrl)
        if (this.imageUrl != sessionStorage.getItem('image')) {
          sessionStorage.setItem('image', this.imageUrl)
        }
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  created() {
    this.uploadData = {
      userID: sessionStorage.getItem('userID')
    }
    this.ruleForm = {
      emp_no: sessionStorage.getItem('emp_no'),
      name: sessionStorage.getItem('name'),
      sex: sessionStorage.getItem('sex'),
      systems: sessionStorage.getItem('systems'),
      major: sessionStorage.getItem('major'),
      class: sessionStorage.getItem('class'),
      mobile: sessionStorage.getItem('mobile'),
      email: sessionStorage.getItem('email'),
      address: sessionStorage.getItem('address'),
      image: sessionStorage.getItem('image'),
      hobby:
        sessionStorage.getItem('hobby') != 'null'
          ? sessionStorage.getItem('hobby')
          : '无',
      explains:
        sessionStorage.getItem('hobby') != 'null'
          ? sessionStorage.getItem('explains')
          : '无'
    }
    this.defaultForm = {
      emp_no: sessionStorage.getItem('emp_no'),
      name: sessionStorage.getItem('name'),
      sex: sessionStorage.getItem('sex'),
      systems: sessionStorage.getItem('systems'),
      major: sessionStorage.getItem('major'),
      class: sessionStorage.getItem('class'),
      mobile: sessionStorage.getItem('mobile'),
      email: sessionStorage.getItem('email'),
      address: sessionStorage.getItem('address'),
      image: sessionStorage.getItem('image'),
      hobby: sessionStorage.getItem('hobby'),
      explains: sessionStorage.getItem('explains')
    }
    this.imageUrl = sessionStorage.getItem('image')

    for (let i = 0; i < this.systemsList.length; i++) {
      for (let key in this.systemsList[i]) {
        if (this.systemsList[i]['name'] == sessionStorage.getItem('systems')) {
          this.childList = this.systemsList[i]['child']
          return false
        }
      }
    }
  },
  mounted() {
    this.systemsList = sysList
  }
}
</script>
<style scoped>
.ownPeace {
  background-color: #fff;
  padding: 20px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.img {
  width: 200px;
  height: 200px;
  margin: 10px 10px 10px 60px;
  border: 1px solid #ccc;
}
.img img {
  width: 100%;
  height: 100%;
}
.formBox {
  max-width: 500px;
}
.imgMainBox {
  display: flex;
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
  position: relative;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.uploadBox {
  position: relative;
  top: 20px;
}
.uploadBtn {
  /* margin: 0 10px 10px 80px; */
}
</style>