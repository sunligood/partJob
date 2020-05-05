<template>
  <div class="merchant-product">
    <div class="add-btn">
      <el-button type="primary" size="mini" @click="addPrdShow">新增商品</el-button>
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
      <el-table-column align="center" prop="saleNum" label="销量"></el-table-column>
      <el-table-column align="center" prop="counts" label="库存"></el-table-column>
      <el-table-column align="center" prop="createdDate" label="上架时间"></el-table-column>
      <el-table-column align="center" label="操作" width="280">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
    <!-- 新增商品 -->
    <el-dialog :title="isEdit ? '编辑商品' : '新增商品'" :visible.sync="addVisible">
      <el-form>
        <el-form-item label="商品图片" :label-width="'80px'">
          <el-upload
            class="avatar-uploader"
            action="/addPrd"
            ref="upload"
            :data="addPrdData"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="beforeAddChange"
            :on-success="addSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名" :label-width="'80px'">
          <el-input v-model="addPrdData.prdName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" :label-width="'80px'">
          <el-input v-model="addPrdData.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="'80px'">
          <el-input-number v-model="addPrdData.price" :min="1" :max="9999999"></el-input-number>
        </el-form-item>
        <el-form-item label="库存" :label-width="'80px'">
          <el-input-number v-model="addPrdData.counts" :min="1" :max="9999999"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" :label-width="'80px'">
          <el-input v-model="addPrdData.unit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPrd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MerchantProduct',
  data() {
    return {
      fileList: [],
      currentPage: 1,
      pageSize: 10,
      userInfo: this.$store.state.userInfo,
      addVisible: false,
      editVisible: false,
      imageUrl: '',
      addPrdData: {
        prdName: '',
        price: '',
        unit: '',
        counts: '',
        detail: ''
      },
      prdDetail: {
        prdName: '',
        price: '',
        unit: '',
        counts: '',
        detail: ''
      },
      isEdit: false,
      tableData: []
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
    // 确认新增商品
    addPrd() {
      if (!this.isEdit) {
        this.addPrdData.storeName = this.userInfo.storeName
        this.addPrdData.saleNum = 0
        this.addPrdData.favourable = 0
        this.addPrdData.harmful = 0
        this.addPrdData.createdDate = this.$dateFormat('YYYY-mm-dd', new Date())
      }
      console.log(this.addPrdData, 1)
      this.$refs.upload.submit()
    },
    // 添加成功回调
    addSuccess() {
      this.$message({
        message: this.isEdit ? '编辑商品成功！' : '添加商品成功！',
        type: 'success'
      })
      this.addVisible = false
      this.$refs.upload.clearFiles()
      this.queryStorePrd()
    },
    // 上传图片前验证
    beforeAddChange(file) {
      const isJPG = file.type === 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
        return
      }
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 查询商品
    queryStorePrd() {
      this.$axios
        .post('/queryPrd', { storeName: this.userInfo.storeName })
        .then(res => {
          this.tableData = res.data
        })
    },
    addPrdShow() {
      if (this.userInfo.isAuthority === '0') {
        this.$message({
          type: 'warning',
          message: '亲~你没有上架商品权限'
        })
        return
      }
      this.addVisible = true
      this.isEdit = false
      this.addPrdData.isEdit = false
      this.imageUrl = null
    },
    handleEdit(index, row) {
      console.log(row)
      this.addVisible = true
      this.isEdit = true
      this.addPrdData = row
      this.addPrdData.isEdit = true
      this.imageUrl = row.imageUrl
    },
    handleDelete(index, row) {
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
    handleDetail(index, row) {
      this.$router.push('/merchant/detail/' + row.prdID)
    }
  },
  components: {}
}
</script>
<style lang="scss">
.merchant-product {
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