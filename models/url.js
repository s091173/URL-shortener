const mongoose = require('mongoose') // 連到資料庫
const Schema = mongoose.Schema    //使用mongoose 提供的 schema 模組
const urlSchema = new Schema({ // 建立資料內容的屬性
  link: {
    type: String
  },
  shortenedURL: {
    type: String
  }
})


//將這份schema命名為URL 並匯出
module.exports = mongoose.model('URL', urlSchema)
