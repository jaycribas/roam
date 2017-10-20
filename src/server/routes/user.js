const router = require('express').Router()
const users = require('../../models/db/users')

router.get('/:userId', (req, res) => {
  let userId = req.params.userId
  res.render('users/profile')
})

module.exports = router
