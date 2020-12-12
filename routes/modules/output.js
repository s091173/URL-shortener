const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const bodyParser = require('body-parser')
const generateShortenedURL = require('../../public/javascript/URLshorten.js')
router.use(bodyParser.urlencoded({ extended: true }))



// 輸入網址，按下shorten後
router.post('/output', (req, res) => {
  let shortened = '' // 將縮短的網址部分設為變數shortened
  const link = req.body.website // 儲存 user 想進入的頁面
  URL.find({ link }) // 先看看資料庫內是否已有相對應的短網址
    .lean()
    .then(links => {
      if (links.length !== 0) { // 如果有已有相對應的短網址
        shortened = links[0].shortenedURL
      } else { // 如果沒有相對應的短網址
        shortened = generateShortenedURL() // 儲存剛做完的短網址
        URL.find({ shortenedURL: shortened })  //確認新產生的網址與之前的網址沒有重複  
          .lean()
          .then(urls => {
            while (urls.length !== 0) { //如果有重複的話就一直重新產生新短網址 並 將新的短網址覆蓋過去
              shortened = generateShortenedURL()
            }
            URL.create({  // 寫入資料庫
              link,  // 新增新的網頁連結
              shortenedURL: shortened  // 及新增相對應的短網址
            })
          })
      }
    })
    .then(() => {
      // console.log(link, shortened)
      res.render('output', { link, shortened })   // 點擊連結可導向  user 想進入的頁面
    }).catch(error => console.log(error))

})

router.get(`/:shortened`, (req, res) => {
  const url = req.params.shortened
  URL.find({ shortenedURL: url })
    .lean()
    .then(urls => {
      const website = urls[0].link
      res.redirect(`${website}`)
    })
})


module.exports = router