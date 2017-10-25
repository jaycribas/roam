const db = require('./db')

const create = function create(user) {
  return db.one(`
    INSERT INTO
      users (email, password, joined_on)
    VALUES
      ($/email/, $/password/, NOW())
    RETURNING
      *
  `, user)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.create!',
        arguments
      })
      throw error
    })
}

const find = function find(user) {
  return db.oneOrNone(`
    SELECT * FROM
      users
    WHERE
      email = $/email/
    AND
      password = $/password/
  `, user)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.find!',
        arguments
      })
      throw error
    })
}

module.exports = { create, find }
