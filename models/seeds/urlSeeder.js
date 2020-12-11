const URL = require('../url')
const db = require('../../config/mongoose')
db.once('open', () => {
  console.log('db connected!')
  URL.create({
    link: 'https://www.google.com/',
    shortenedURL: 'B4fUv'
  }, {
    link: 'https://www.youtube.com',
    shortenedURL: 'SaSKE'
  }, {
    link: 'https://mongoosejs.com',
    shortenedURL: 'zif1r'
  })
    .then(() => {
      console.log('urlSeeder has done!')
      db.close()
    })
})