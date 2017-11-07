const db = require('./db')

const create = (user) => {
  return db.one(`
    INSERT INTO
      users (name, email, password, joined_on, city, img_url)
    VALUES
      ($/name/, $/email/, $/password/, NOW(), $/city/, '/images/blank-profile-picture.png')
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

const findByEmail = (user) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE
      email = $/email/
  `, user)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.find!',
        arguments
      })
      throw error
    })
}

const findById = (id) => {
  return db.one(`
    SELECT
      *
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
      city = $/city/,
      img_url = $/img_url/
    WHERE
      id = $/id/
    RETURNING
      *
  `, user)
}

module.exports = {
  create,
  findByEmail,
  findById,
  update
}
