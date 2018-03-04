const sessionChecker = (req, res, next) => {
  const currentUrl = req.url
  if (!req.session.user) {
    return res.redirect(`/login?REDIRECT_URL=${currentUrl}`)
  } next()
}

const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    res.locals.isLoggedIn = true
    req.user = req.session.user
    res.locals.loggedin_user_id = req.user.id
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
