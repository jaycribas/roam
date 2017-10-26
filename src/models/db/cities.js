const db = require('./db')

const getAll = () => {
  return db.any(`
    SELECT * FROM cities
  `)
    .catch((error) => {
      console.error({
        message: 'Error while executing cities.getAll :(',
        arguments
      })
      throw error
    })
}

module.exports = { getAll }
