const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, saltRounds)
}

const compareHash = (plainTextPassword, hash) => {
  return bcrypt.compare(plainTextPassword, hash)
}

const formatDate = (timestamp) => {
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return month[timestamp.getMonth()] + ' ' + timestamp.getFullYear()
}

module.exports = {
  hashPassword,
  compareHash,
  formatDate
}
