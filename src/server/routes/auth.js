const router = require('express').Router()
const users = require('../../models/db/users')

router.route('/login')
  .get((req, res) => {
    res.render('auth/login', { warning: '' })
  })
  .post((req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    users.find(user)
      .then((data) => {
        if (!data) {
          return res.status(401).render('auth/login', { warning: 'Invalid email or password' })
        }
        return res.redirect('/')
      })
      .catch((error) => {
        console.error(error.message)
      })
  })

router.route('/signup')
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

module.exports = router