const router = require('express').Router()
const posts = require('../../models/db/posts')
const users = require('../../models/db/users')
const utils = require('../utils')

router.post('/new', (req, res) => {
  posts.create(req.body)
    .then(() => res.redirect('back'))
})

router.get('/:id', (req, res) => {
  posts.findById(req.params.id)
    .then((post) => {
      users.findById(post.user_id)
        .then((user) => {
          res.render('posts/post', {
            user,
            post,
            title: 'Roam | New Post',
            loggedin_user_id: req.user.id
          })
        })
    })
})

router.post('/edit/:id', (req, res) => {
  posts.update(req.body)
    .then(() => res.redirect('back'))
})

router.post('/delete/:id', (req, res) => {
  posts.destroy(req.body)
    .then(() => res.redirect(`/user/${req.user.id}`))
})

module.exports = router
