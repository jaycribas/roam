const db = require('./db')

const create = (user) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($/email/, $/password/)
    RETURNING
      *
  `, user)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.create!',
        arguments,
      })
      throw error
    })
}

module.exports = { create }
