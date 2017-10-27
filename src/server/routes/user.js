const router = require('express').Router()
const users = require('../../models/db/users')
const posts = require('../../models/db/posts')

router.get('/:id', (req, res) => {
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

router.post('/edit-profile/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = req.session.user
  user.city = req.body.city
  if (id === user.id) {
    return users.update(user)
      .then(() => {
        return res.redirect('back')
      })
      .catch((error) => {
        console.log(`Error at POST edit-profile/${id}`, error)
      })
  }
  return res.status(401).send('Unauthorized')
})

module.exports = router
