const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateShortenedURL = require('./URLshorten.js')
const myWebsite = 'https://peaceful-taiga-20007.herokuapp.com'
const URL = require('./models/url')
const app = express()
const port = 3000

require('./config/mongoose')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

// middleware
// 按下shorten鍵後導入output頁面
// app.use('/shorten/output', (req, res, next) => {
//   url = generateShortenedURL() // 完成的短網址
//   link = req.body.website // user 想進入的頁面
//   res.render('output', { link,  })
//   next()
// })



//   .use(`${myWebsite}/:url`, (req, res, next) => {
//   // 在伺服器啟動期間，使用者可以在瀏覽器的網址列，輸入你提供的短網址，瀏覽器就會導向使用者要進入的網站
//   console.log(req)
//   console.log(`get link: ${link}`)
//   res.redirect(`${link}`)
//   next()
// })


// 首頁
app.get('/', (req, res) => {
  res.render('home')
})


// 輸入網址，按下shorten後
app.post('/shorten/output', (req, res) => {
  let shortened = '' // 將縮短的網址部分設為變數shortened
  let link = req.body.website // 儲存 user 想進入的頁面
  URL.find({ link }) // 先看看資料庫內是否已有相對應的短網址
    .lean()
    .then(links => {
      if (links.length !== 0) { // 如果有
        shortened = links[0].shortenedURL
      } else { // 如果沒有
        shortened = generateShortenedURL() // 儲存剛做完的短網址
        URL.create({  // 寫入資料庫
          link,  // 新增新的網頁連結
          shortenedURL: shortened  // 及新增相對應的短網址
        })
      }
    })
    .then(() => {
      console.log(link, shortened)
      res.render('output', { link, shortened })   // 點擊連結可導向  user 想進入的頁面
    }).catch(error => console.log(error))
})

// 當 user輸入短網址後，可進入user 想進入的頁面
app.get(`${myWebsite}/:shortened`, (req, res) => {
  let url = req.params
  console.log(url)
  URL.find({ shortenedURL: url })
    .lean()
    .then(() => res.redirect(`${link}`))
})

app.listen(port, () => {
  console.log(`Express app is listening on port ${port}.`)
})