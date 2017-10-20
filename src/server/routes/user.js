const router = require('express').Router()
const users = require('../../models/db/users')

router.get('/:id', (req, res) => {
  res.render('users/profile')
})

module.exports = router
