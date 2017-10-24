const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./server/routes')
const morgan = require('morgan')
const middlewares = require('./server/middlewares')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(middlewares.setDefaultResponseLocals)

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
