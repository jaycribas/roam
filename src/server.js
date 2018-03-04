const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./server/routes')
const morgan = require('morgan')
const methodOverride = require('method-override')
const middlewares = require('./server/middlewares')
const session = require('express-session')

const app = express()

app.use(session({
  key: 'user_sid',
  secret: 'roam secret',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(middlewares.setDefaultResponseLocals)


app.use((req, res, next) => {
  next()
})
app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
