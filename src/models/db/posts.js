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

const findById = (id) => {
  return db.one(`
    SELECT
      *,
      TO_CHAR(posted_on, 'MM/DD/YYYY') AS posted_on
    FROM
      posts
    WHERE
      id = $1::int
  `, id)
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.findById :(',
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
      cities.id AS city_id,
      cities.name,
      cities.img_url,
      body,
      users.id AS user_id,
      users.name AS user_name,
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

const update = (post) => {
  return db.one(`
    UPDATE
      posts
    SET
      title = $/title/,
      body = $/body/
    WHERE
      id = $/id/
    RETURNING
      *
  `, post)
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.update :(',
        arguments
      })
      throw error
    })
}

const destroy = (post) => {
  return db.none(`
    DELETE FROM
      posts
    WHERE
      id = $/id/
  `, post)
    .catch((error) => {
      console.error({
        message: 'Error while executing posts.destroy :(',
        arguments
      })
      throw error
    })
}

module.exports = {
  create,
  findById,
  findByUserId,
  findByCityId,
  update,
  destroy
}
