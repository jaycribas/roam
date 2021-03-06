const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const citiesRoutes = require('./cities')
const postsRoutes = require('./posts')
const session = require('express-session')
const middlewares = require('../middlewares')
const cities = require('../../models/db/cities')

router.use(middlewares.isLoggedIn)
router.use('/', authRoutes)
router.get('/', (req, res) => {
  cities.getAll()
    .then((allCities) => {
      res.render('index', {
        cities: allCities,
        user: req.user,
        title: 'Roam | Home'
      })
    })
})
router.use(middlewares.sessionChecker)
router.use('/cities', citiesRoutes)
router.use('/user', userRoutes)
router.use('/posts', postsRoutes)

module.exports = router
