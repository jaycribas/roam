const router = require('express').Router()

router.get('/new', (req, res) => {
  res.render('posts/new')
})

router.get('/:id', (req, res) => {
  res.render('posts/post', { user: req.session.user })
})

module.exports = router
