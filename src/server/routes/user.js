const router = require('express').Router()
const users = require('../../models/db/users')
const posts = require('../../models/db/posts')

router.route('/:id')
  .get((req, res) => {
    users.findById(req.params.id)
      .then((user) => {
        posts.findByUserId(user.id)
          .then(userPosts => res.render('users/profile', {
            user,
            posts: userPosts,
            title: 'Roam | Profile',
            loggedin_user_id: req.user.id
          }))
      })
      .catch((error) => {
        console.log(`Error at GET user/${req.params.id}`, error)
      })
  })

  .put((req, res) => {
    const user = req.user
    user.name = req.body.name
    user.city = req.body.city
    user.img_url = req.body.img_url
    if (Number(req.params.id) === user.id) {
      return users.update(user)
        .then(() => res.redirect('back'))
        .catch((error) => {
          console.log(`Error at POST edit-profile/${req.params.id}`, error)
        })
    }
    return res.status(401).redirect('back')
  })

module.exports = router
