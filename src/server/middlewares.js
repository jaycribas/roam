const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    res.locals.isLoggedIn = true
    req.user = req.session.user
    return next()
  } next()
}

const setDefaultResponseLocals = (req, res, next) => {
  res.locals.title = 'Roam'
  res.locals.warning = ''
  res.locals.isLoggedIn = false
  next()
}

module.exports = {
  sessionChecker,
  isLoggedIn,
  setDefaultResponseLocals
}
