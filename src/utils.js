const bcrypt = require('bcrypt')

const hashPassword = (plainTextPassword) => {
  const saltRounds = 10
  return bcrypt.hash(plainTextPassword, saltRounds)
}

const compareHash = (plainTextPassword, hash) => {
  return bcrypt.compare(plainTextPassword, hash)
}

module.exports = {
  hashPassword,
  compareHash
}
