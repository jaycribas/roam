const db = require('./db')

const create = (user) => {
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

const find = (user) => {
  return db.oneOrNone(`
    SELECT
      id, email, password, city, TO_CHAR(joined_on, 'MM/YYYY') AS joined_on
    FROM
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

const readProfile = (id) => {
  return db.one(`
    SELECT
      id, email, city, TO_CHAR(joined_on, 'MM/YYYY') AS joined_on, img_url
    FROM
      users
    WHERE
      id = $1::int
  `, id)
    .catch((error) => {
      console.error({
        message: 'Error while executing users.readProfile!',
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
  find,
  readProfile,
  update
}
