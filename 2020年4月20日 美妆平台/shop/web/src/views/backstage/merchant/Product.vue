<template>
  <div class="merchant-product">
    <div class="add-btn">
      <el-button type="primary" @click="addPrdShow">新增商品</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt width="50px" height="50px" />
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          <span>{{ scope.row.prdName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}/{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量">
        <template slot-scope="scope">
          <span>{{ scope.row.saleNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scope">
          <span>{{ scope.row.counts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog title="编辑商品" :visible.sync="editVisible">
      <el-form>
        <el-form-item label="商品名" :label-width="'120px'">
          <el-input v-model="prdDetail.prdName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="'120px'">
          <el-input-number v-model="prdDetail.price" :min="1" :max="9999999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editVisible = false">确 定</el-button>
      </div>
    </el-dialog>-->
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
            :show-file-list="false"
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
      userInfo: this.$store.state.userInfo,
      addVisible: false,
      editVisible: false,
      imageUrl: '',
      addPrdData: {
        prdName: '',
        price: '',
        unit: '',
        counts: ''
      },
      prdDetail: {
        prdName: '',
        price: '',
        unit: '',
        counts: ''
      },
      isEdit: false,
      tableData: []
    }
  },
  created() {
    this.queryStorePrd()
  },
  methods: {
    // 确认新增商品
    addPrd() {
      if (!this.isEdit) {
        this.addPrdData.storeName = this.userInfo.storeName
        this.addPrdData.saleNum = 0
        this.addPrdData.favourable = 0
        this.addPrdData.harmful = 0
        this.addPrdData.createdDate = this.$dateFormat('YYYY-mm-dd', new Date())
      }
      this.$refs.upload.submit()
    },
    // 添加成功回调
    addSuccess() {
      this.$message({
        message: this.isEdit ? '编辑商品成功！' : '添加商品成功！',
        type: 'success'
      })
      this.addVisible = false
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
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.tableData = res.data
        })
    },
    addPrdShow() {
      this.addVisible = true
      this.isEdit = false
    },
    handleEdit(index, row) {
      this.addVisible = true
      this.isEdit = true
      // this.prdDetail = row
      this.addPrdData = row
      this.addPrdData.isEdit = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  },
  components: {}
}
</script>
<style lang="scss">
.merchant-product {
  padding: 30px;
  .add-btn {
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