<template>
  <div class="classPicture">
    <vDetail></vDetail>
    <div class="main">
      <div
        class="cardItem"
        v-for="(item, index) in imgArr"
        :key="index"
        @click="openPicture(item.url)"
      >
        <div class="imgB">
          <img :src="item.url" alt />
          <!-- <el-image
            style="width: 100%; height: 200px;"
            :src="item.url"
            :preview-src-list="urlArr"
            :fit="fit"
          ></el-image>-->
        </div>
        <div class="words">
          <span>发布时间：</span>
          <span>{{item.createdDate.substr(0,10)}}</span>
        </div>
        <div class="words">
          <span>发布人：</span>
          <span>{{item.author}}</span>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <el-button type="primary" @click="showImgBox()">上传图片</el-button>
    </div>

    <el-dialog title="上传图片" :visible.sync="imgBoxShow" :close-on-click-modal="close=false">
      <el-upload class="upload-demo" drag action="/addClassAlbum" multiple :data="uploadImgData">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-button type="primary" @click="finishUpload()">完成上传</el-button>
        </div>
      </el-upload>
    </el-dialog>

    <el-dialog title="查看大图" :visible.sync="dialogFormVisible" width="80%">
      <div class="imgBox">
        <img class="showImgUrl" :src="showImgUrl" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vDetail from './ccommon/classDetail'
import VueCropper from 'vue-cropperjs'
export default {
  components: {
    vDetail,
    VueCropper
  },
  data() {
    return {
      imgArr: [],
      dialogFormVisible: false,
      imageUrl: '',
      imgBoxShow: false,
      uploadImgData: {},
      urlArr: [],
      showImgUrl: ''
    }
  },
  methods: {
    showImgBox() {
      this.imgBoxShow = true
    },
    uploadImg() {},
    openPicture(url) {
      this.showImgUrl = url
      this.dialogFormVisible = true
    },
    finishUpload() {
      this.imgBoxShow = false
      this.$axios
        .post('/queryClassAlbum', {
          systems: this.uploadImgData.systems,
          major: this.uploadImgData.major,
          class: this.uploadImgData.class
        })
        .then(res => {
          this.imgArr = res.data.data
        })
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
    }
  },
  created() {
    this.cropImg = this.defaultSrc
    this.uploadImgData = {
      author: sessionStorage.getItem('name'),
      major: sessionStorage.getItem('major'),
      systems: sessionStorage.getItem('systems'),
      class: sessionStorage.getItem('class'),
      createdDate: this.getTime()
    }

    this.$axios
      .post('/queryClassAlbum', {
        systems: this.uploadImgData.systems,
        major: this.uploadImgData.major,
        class: this.uploadImgData.class
      })
      .then(res => {
        this.imgArr = res.data.data

        for (let i = 0; i < this.imgArr.length; i++) {
          for (let key in this.imgArr[i]) {
            if (key == 'url') {
              this.urlArr.push(this.imgArr[i][key])
            }
          }
        }
      })
  }
}
</script>``
<style scoped>
.main {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.cardItem {
  width: 25%;
  max-width: 200px;
  background-color: #fff;
  padding: 5px;
  margin: 0 20px 20px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.cardItem img {
  width: 100%;
}
.cardItem .words {
  padding: 2px;
  font-size: 14px;
  color: #9e9d9d;
  text-align: center;
}
.btnBox {
  margin-top: 20px;
  text-align: center;
}
.openPicture {
  width: 500px;
}
.openPicture img {
  width: 100%;
}
/* 图片上传 */
.upload-demo {
  text-align: center;
}
.el-image__inner {
  width: 200px;
}
.imgB img {
  width: 200px;
  height: 200px;
}
.imgBox {
  text-align: center;
}
.showImgUrl {
  width: 100%;
}
</style>