const router = require('express').Router()
const posts = require('../../models/db/posts')

router.get('/:id', (req, res) => {
  posts.findByCityId(req.params.id)
    .then((dbPosts) => {
      const cityName = dbPosts[0].name
      res.render('city', {
        city_name: cityName,
        posts: dbPosts,
        user: req.user,
        title: `Roam | ${cityName}`
      })
    })
})

module.exports = router
