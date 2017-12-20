const db = require('./db')
const utils = require('../../utils')

const create = (user) => {
  return utils.hashPassword(user.password)
    .then((hash) => {
      user.password = hash
      return db.one(`
        INSERT INTO
        users (name, email, password, joined_on, city, img_url)
        VALUES
        ($/name/, lower($/email/), $/password/, NOW(), $/city/, '/images/blank-profile-picture.png')
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
    })
}

const login = (user) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE
      email = $/email/
  `, user)
    .then((dbUser) => {
      return utils.compareHash(user.password, dbUser.password)
        .then((match) => {
          if (!match) throw Error
          else return dbUser
        })
    })
    .catch((error) => {
      console.log({
        message: 'Error while executing users.login!',
        error
      })
      throw error
    })
}

const findById = (id) => {
  return db.oneOrNone(`
    SELECT
      *,
      TO_CHAR(joined_on, 'Mon YYYY') AS joined_on
    FROM
      users
    WHERE
      id = $1::int
  `, id)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.findById!',
        arguments
      })
      throw error
    })
}

const update = (user) => {
  return db.one(`
    UPDATE
      users
    SET
      name = $/name/,
      city = $/city/,
      img_url = $/img_url/
    WHERE
      id = $/id/
    RETURNING
      *
  `, user)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.update!',
        arguments
      })
      throw error
    })
}

module.exports = {
  create,
  login,
  findById,
  update
}
