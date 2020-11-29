const Joi = require('@hapi/joi')

let addTopic = Joi.object({
    topicTitle: Joi.string().required(),
    topicDesc: Joi.string().required(),
    // courseID: Joi.number().required(),
});

let editTopic = Joi.object({
    topicTitle: Joi.string().required(),
    topicDesc: Joi.string().required(),
    // courseID: Joi.number().required(),
    id: Joi.number().required(),
});

let modifyTopic = Joi.object({
    // courseID: Joi.number().required(),
    id: Joi.number().required(),
});

module.exports = {
    addTopic,
    editTopic,
    modifyTopic,
}