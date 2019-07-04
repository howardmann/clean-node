let Joi = require('joi')

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number(),
  grade: Joi.number(),
  prefect: Joi.boolean()
})

