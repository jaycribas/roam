const db = require('./db')

const create = function create(post) {
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

const findByUserId = function findPostsByUserId(id) {
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
  findByUserId
}
