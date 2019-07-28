require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  mongo: {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW
  }
}