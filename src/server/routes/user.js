const router = require('express').Router()
const users = require('../../models/db/users')
const posts = require('../../models/db/posts')

router.get('/:id', (req, res) => {
  console.log("req.params.id (╯°□°）╯︵ ┻━┻", req.params.id)
  users.readProfile(req.params.id)
    .then((foundUser) => {
      posts.findByUserId(foundUser.id)
        .then((dbPosts) => {
          return res.render('users/profile', { user: foundUser, posts: dbPosts, title: 'Roam | Profile' })
        })
    })
    .catch((error) => {
      console.log(`Error at GET user/${id}`, error)
    })
})

router.post('/edit-profile', (req, res) => {
  const user = req.session.user
  user.city = req.body.city
  users.update(user)
    .then(() => {
      res.redirect('back')
    })
})

module.exports = router
