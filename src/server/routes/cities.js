const router = require('express').Router()

router.get('/:city', (req, res) => {
  res.render('city')
})

module.exports = router
