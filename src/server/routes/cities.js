const router = require('express').Router()
const posts = require('../../models/db/posts')

router.get('/:id', (req, res) => {
  posts.findByCityId(req.params.id)
    .then((cityPosts) => {
      const cityName = cityPosts[0].name
      res.render('city', {
        city_name: cityName,
        posts: cityPosts,
        user: req.user,
        title: `Roam | ${cityName}`
      })
    })
})

module.exports = router
