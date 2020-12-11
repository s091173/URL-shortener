const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const output = require('./modules/output')
router.use('/shorten', output)


module.exports = router