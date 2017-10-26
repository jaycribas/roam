const router = require('express').Router()
const posts = require('../../models/db/posts')

router.get('/new', (req, res) => {
  res.render('posts/new')
})

router.get('/:id', (req, res) => {
  posts.findByIdWithAuthor(req.params.id)
    .then((post) => {
      const user = {
        id: post.user_id,
        email: post.email,
        city: post.city,
        joined_on: post.joined_on
      }

      res.render('posts/post', { post, user })
    })
})

module.exports = router
