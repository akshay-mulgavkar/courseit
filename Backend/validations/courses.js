const Joi = require('@hapi/joi')

let addCourse = Joi.object({
    courseTitle: Joi.string().required(),
    courseDesc: Joi.string().required(),
    courseDuration: Joi.number().required(),
});

let editCourse = Joi.object({
    courseTitle: Joi.string().required(),
    courseDesc: Joi.string().required(),
    courseDuration: Joi.number().required(),
    id: Joi.number().required(),
});

let modifyCourse = Joi.object({
    id: Joi.number().required(),
});

module.exports = {
    addCourse,
    editCourse,
    modifyCourse,
}