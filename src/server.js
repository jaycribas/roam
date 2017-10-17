const express = require('express')
const path = require('path')
const users = require('./models/db/users')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.route('/login')
  .get((req, res) => {
    res.render('auth/login')
  })
  .post((req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    users.find(user)
      .then((data) => {
        if(!data){
          return res.send('nope')
        }
        res.send('welcome')
      })
      .catch((error) => {
        console.error(error.message)
      })
  })

app.route('/signup')
  .get((req, res) => {
    res.render('auth/signup')
  })
  .post((req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    users.create(user)
      .then(() => {
        res.redirect('/')
      })
  })

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
