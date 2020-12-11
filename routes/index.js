const express = require('express')
const router = express.Router()
const myWebsite = 'https://peaceful-taiga-20007.herokuapp.com'

const home = require('./modules/home')
router.use('/', home)

const output = require('./modules/output')
router.use('/shorten', output)

const shortenedURL = require('./modules/shortenedURL')
router.use(`${myWebsite}`, shortenedURL)

module.exports = router