const router = require('express').Router()
const posts = require('../../models/db/posts')

router.post('/new', (req, res) => {
  posts.create(req.body)
    .then(() => res.redirect('back'))
})

router.get('/:id', (req, res) => {
  posts.findByIdWithAuthor(req.params.id)
    .then((post) => {
      const user = {
        id: post.user_id,
        email: post.email,
        city: post.city,
        joined_on: post.joined_on,
        img_url: post.user_img
      }

      res.render('posts/post', { post, user }, { title: 'Roam | New Post' })
    })
})

module.exports = router
