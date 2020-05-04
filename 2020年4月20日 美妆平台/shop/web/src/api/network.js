import { Loading, Message } from 'element-ui';
import axios from 'axios';
function post(url, params) {
  return new Promise((resolve, reject) => {
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    axios.post(url, params)
      .then(res => {
        if (res.data.code) {
          resolve(res.data)
        } else {
          Message.error(res.data.msg)
        }
        loading.close()
      })
      .catch(err => {
        loading.close()
        Message.error(err)
      })
  })
}
export default { post }