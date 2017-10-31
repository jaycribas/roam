const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, saltRounds)
}

const compareHash = (plainTextPassword, hash) => {
  return bcrypt.compare(plainTextPassword, hash)
}

module.exports = {
  hashPassword,
  compareHash
}
