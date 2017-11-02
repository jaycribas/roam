const router = require('express').Router()
const users = require('../../models/db/users')
const utils = require('../utils')

router.route('/login')
  .get((req, res) => {
    res.render('auth/login', {
      title: 'Roam | Log In'
    })
  })

  .post((req, res, next) => {
    users.find(req.body)
      .then((user) => {
        if (!user) {
          return res.status(401).render('auth/login', {
            warning: 'Invalid email or password',
            title: 'Roam | Log In'
          })
        }
        return utils.compareHash(req.body.password, user.password)
          .then(() => {
            req.session.user = user
            return res.redirect(`/user/${user.id}`)
          })
      })
      .catch((error) => {
        next(error)
      })
  })

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.route('/signup')
  .get((req, res) => {
    res.render('auth/signup', {
      title: 'Roam | Sign Up'
    })
  })

  .post((req, res) => {
    const user = req.body
    if (req.body.password !== req.body.confirmPassword) {
      return res.render('auth/signup', {
        warning: 'Passwords do not match.',
        title: 'Roam | Sign Up'
      })
    }
    return utils.hashPassword(user.password)
      .then((hash) => {
        user.password = hash
        return users.create(user)
          .then((newUser) => {
            req.session.user = newUser
            return res.redirect(`/user/${newUser.id}`)
          })
      })
  })

module.exports = router
