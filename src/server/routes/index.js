const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const citiesRoutes = require('./cities')
const postsRoutes = require('./posts')

router.use('/', authRoutes)
router.use('/user', userRoutes)
router.use('/cities', citiesRoutes)
router.use('/posts', postsRoutes)

router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router
