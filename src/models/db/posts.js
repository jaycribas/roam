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
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.findByIdWithAuthor :(',
        arguments
      })
      throw error
    })
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

const findByCityId = (id) => {
  return db.any(`
    SELECT
      posts.id,
      cities.name,
      cities.img_url,
      body,
      users.img_url AS user_img,
      email,
      posted_on AS post_date,
      TO_CHAR(posted_on, 'MM/DD/YYYY') AS posted_on
    FROM
      posts
    JOIN
      cities ON cities.id = city_id
    JOIN
      users ON user_id = users.id
    WHERE
      city_id = $1::int
    ORDER BY
      post_date DESC
  `, id)
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.findByCityId :(',
        arguments
      })
      throw error
    })

}

module.exports = {
  create,
  findByIdWithAuthor,
  findByUserId,
  findByCityId
}
