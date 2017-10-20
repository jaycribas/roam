const router = require('express').Router()

router.get('/:id', (req, res) => {
  res.render('city')
})

module.exports = router
