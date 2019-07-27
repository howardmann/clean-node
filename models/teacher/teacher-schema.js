let Joi = require('joi')

module.exports = Joi.object().keys({
  name: Joi.string().required().error(() => 'must have name as string'),
  subject: Joi.string().error(() => 'subject must be a string'),
  tenure: Joi.boolean().error(() => 'tenure must be a boolean')
})
