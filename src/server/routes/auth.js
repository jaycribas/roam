const router = require('express').Router()
const users = require('../../models/db/users')

router.route('/login')
  .get((req, res) => {
    res.render('auth/login', { title: 'Roam | Title' })
  })
  .post((req, res, next) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    users.find(user)
      .then((match) => {
        if (!match) {
          return res.status(401).render('auth/login', { warning: 'Invalid email or password' })
        }
        req.session.user = match
        res.redirect(`/user/${match.id}`)
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
    res.render('auth/signup', { title: 'Roam | Sign Up' })
  })
  .post((req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    if (req.body.password === req.body.confirmPassword) {
      return users.create(user)
        .then((newUser) => {
          req.session.user = newUser
          return res.redirect(`/user/${newUser.id}`)
        })
    }
    return res.render('auth/signup', { warning: 'Passwords do not match.' })
  })

module.exports = router
