let Joi = require('joi')

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  subject: Joi.string(),
  tenure: Joi.boolean()
})
