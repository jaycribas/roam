const router = require('express').Router()
const users = require('../../models/db/users')
const posts = require('../../models/db/posts')

router.get('/:id', (req, res) => {
  const user = req.session.user
  const id = user.id
  posts.findByUserId(id)
    .then((dbPosts) => {
      return res.render('users/profile', { user, posts: dbPosts })
    })
    .catch((error) => {
      console.log(`Error at GET user/${id}`, error)
    })
})

module.exports = router
