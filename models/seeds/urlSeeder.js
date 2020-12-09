const URL = require('../url')
const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('urlSeeder has done!')
})