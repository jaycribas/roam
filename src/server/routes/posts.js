const router = require('express').Router()
const posts = require('../../models/db/posts')
const utils = require('../utils')

router.post('/new', (req, res) => {
  posts.create(req.body)
    .then(() => res.redirect('back'))
})

router.get('/:id', (req, res) => {
  posts.findByIdWithAuthor(req.params.id)
    .then((post) => {
      const user = {
        id: post.user_id,
        name: post.user_name,
        email: post.email,
        city: post.city,
        joined_on: post.joined_on,
        img_url: post.user_img
      }
      user.joined_on = utils.formatDate(user.joined_on)
      res.render('posts/post', { post, user, title: 'Roam | New Post', session_user_id: req.user.id })
    })
})

module.exports = router
