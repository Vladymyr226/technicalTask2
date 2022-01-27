require('dotenv').config()

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USER_NAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.PORT,
      insecureAuth: true
    },
    pool: {
      min: 2,
      max: 10
    },
  },
}