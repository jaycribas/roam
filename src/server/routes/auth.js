const router = require('express').Router()
const users = require('../../models/db/users')

router.route('/login')
  .get((req, res, next) => {
    res.render('auth/login', { warning: '' })
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
        return res.redirect(`/user/${match.id}`)
      })
      .catch((error) => {
        next(error)
      })
  })

router.get('/logout', (req, res) => {
  res.redirect('/')
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
        req.session.user = user
        res.redirect('/profile')
      })
  })

module.exports = router
