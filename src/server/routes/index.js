const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const citiesRoutes = require('./cities')
const postsRoutes = require('./posts')
const session = require('express-session')
const middlewares = require('../middlewares')
const cities = require('../../models/db/cities')


router.use(session({
  key: 'user_sid',
  secret: 'roam secret',
  resave: false,
  saveUninitialized: false
}))

router.use(middlewares.isLoggedIn)
router.use('/', authRoutes)
router.get('/', (req, res) => {
  cities.getAll()
    .then((allCities) => {
      res.render('index', { cities: allCities, user: req.session.user })
    })
})
router.use('/cities', citiesRoutes)
router.use(middlewares.sessionChecker)
router.use('/user', userRoutes)
router.use('/posts', postsRoutes)

module.exports = router
