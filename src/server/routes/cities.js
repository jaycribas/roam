const router = require('express').Router()
const posts = require('../../models/db/posts')

router.get('/:id', (req, res) => {
  posts.findByCityId(req.params.id)
    .then((dbPosts) => {
      res.render('city', { city_name: dbPosts[0].name, posts: dbPosts, user: req.session.user })
    })
})

module.exports = router
