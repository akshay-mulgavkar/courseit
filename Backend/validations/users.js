const Joi = require('@hapi/joi')

let admin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
});

module.exports = {
    admin,
}