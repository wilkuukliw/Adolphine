const credentials = require('./config/mysqlCredentials')
const { knexSnakeCaseMappers } = require('objection')

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      user: credentials.user,
      password: credentials.password
    },
    ...knexSnakeCaseMappers()
  }
}
