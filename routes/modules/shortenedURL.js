const express = require('express')
const router = express.Router()
const URL = require('../../models/url')


// 當 user輸入短網址後，可進入user 想進入的頁面
router.get(`/:shortened`, (req, res) => {
  let url = req.params.shortened
  console.log(url)
  URL.find({ shortenedURL: url })
    .lean()
    .then(() => res.redirect(`${link}`))
})




module.exports = router