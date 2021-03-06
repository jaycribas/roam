const router = require('express').Router()
const users = require('../../models/db/users')

router.route('/login')
  .get((req, res) => {
    res.render('auth/login', {
      title: 'Roam | Log In',
      redirectUrl: req.query.REDIRECT_URL
    })
  })

  .post((req, res) => {
    users.login(req.body)
      .then((user) => {
        const redirectUrl = req.query.REDIRECT_URL || `/user/${user.id}`
        req.session.user = user
        return res.redirect(redirectUrl)
      })
      .catch(() => res.status(401).render('auth/login', {
        warning: 'Invalid email or password',
        title: 'Roam | Log In',
        redirectUrl: req.query.REDIRECT_URL
      }))
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
    if (user.password !== user.confirmPassword) {
      return res.render('auth/signup', {
        warning: 'Passwords do not match.',
        title: 'Roam | Sign Up'
      })
    }
    return users.create(user)
      .then((newUser) => {
        req.session.user = newUser
        return res.redirect(`/user/${newUser.id}`)
      })
  })

module.exports = router
