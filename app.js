const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(routes)
app.use(bodyParser.urlencoded({ extended: true }))



app.listen(port, () => {
  console.log(`Express app is listening on port ${port}.`)
})