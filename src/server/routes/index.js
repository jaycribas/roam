const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const citiesRoutes = require('./cities')
const postsRoutes = require('./posts')
const session = require('express-session')
const middlewares = require('../middlewares')

router.use(session({
  key: 'user_sid',
  secret: 'roam secret',
  resave: false,
  saveUninitialized: false
}))

router.use(middlewares.isLoggedIn)
router.use('/', authRoutes)
router.get('/', (req, res) => {
  res.render('index')
})
router.use('/cities', citiesRoutes)
router.use(middlewares.sessionChecker)
router.use('/user', userRoutes)
router.use('/posts', postsRoutes)



module.exports = router
