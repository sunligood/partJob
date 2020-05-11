const Mysql = require('mysql');

// 创建连接
  const connection = Mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'school_db',
    multipleStatements: true //允许多条sql同时查询
  })
  connection.connect((error) => {
    if (error) {
      console.log(error)
      console.log('连接失败')
    } else {
      console.log('数据库连接成功')
    }
  })

  function dataFormat (sqlData) {
    let result = []
    if (sqlData && Array.isArray(sqlData) && sqlData.length) {
      sqlData.forEach(item => {
        let obj = {}
        for (let key in item) {
          if (item.hasOwnProperty(key)) {
            obj[`${key}`] = item[key]
          }
        }

        result.push(obj)
      })
    }
    return result
  }


module.exports = {mysql: connection, sqlFormat: dataFormat}
