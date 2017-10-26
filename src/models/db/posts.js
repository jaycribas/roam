const db = require('./db')

const create = (post) => {
  return db.one(`
    INSERT INTO
      posts (user_id, city_id, title, body, posted_on)
    VALUES
      ($/user_id/, $/city_id/, $/title/, $/body/, NOW())
    RETURNING
      *
  `, post)
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.create :(',
        arguments
      })
      throw error
    })
}

const findByIdWithAuthor = (id) => {
  return db.one(`
    SELECT
      posts.id,
      user_id,
      title,
      body,
      TO_CHAR(posted_on, 'MM/DD/YYYY') AS posted_on,
      email,
      city,
      TO_CHAR(joined_on, 'MM/YYYY') AS joined_on
    FROM
      posts
    JOIN
      users ON users.id = user_id
    WHERE
      posts.id = $1::int
  `, id)
}

const findByUserId = (id) => {
  return db.any(`
    SELECT * FROM
      posts
    WHERE
      user_id = $1::int
  `, id)
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.findByUserId :(',
        arguments
      })
      throw error
    })

}

module.exports = {
  create,
  findByIdWithAuthor,
  findByUserId
}
