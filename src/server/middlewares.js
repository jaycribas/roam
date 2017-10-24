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
    next()
  } next()
}

const setDefaultResponseLocals = (req, res, next) => {
  res.locals.warning = ''
  res.locals.isLoggedIn = false
  next()
}

module.exports = {
  sessionChecker,
  isLoggedIn,
  setDefaultResponseLocals
}
