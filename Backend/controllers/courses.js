const validations = require('../validations/courses')
const { Course } = require('../models/courses')
const defaultMessages = require('../utility/defaultMessages')
const config = require('../utility/config');
const moment = require('moment')

let addCourse = async (req, res) => {

    const validation = validations.addCourse.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message });
    } else {
        try {

            let course = await Course.findOne({ courseTitle: req.body.courseTitle });
            if (course) return res.status(409).send({ message: defaultMessages.COURSE_ALREADY_PRESENT });

            let data = req.body

            course = new Course(data);

            await course.save();

            res.status(201).json({ message: defaultMessages.COURSE_ADDED, course });

        } catch (e) {
            res.status(400).send({ message: e.toString() });
        }
    }
}

let editCourse = async (req, res) => {

    const validation = validations.editCourse.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message });
    } else {

        try {

            let course = await Course.findOne({ id: req.body.id });
            if (!course) return res.status(400).send({ message: defaultMessages.COURSE_NOT_PRESENT });

            let result = await course.updateOne(req.body)

            course = await Course.findOne({ id: req.body.id }).select('-__v -_id')

            res.status(result.nModified > 0 ? 202 : 406).send({ message: result.nModified > 0 ? defaultMessages.COURSE_UPDATED : defaultMessages.COURSE_NOT_UPDATED, course });

        }
        catch (e) {
            res.status(400).send({ message: e.toString() });
        }
    }
}

let deleteCourse = async (req, res) => {

    const validation = validations.modifyCourse.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message });
    } else {

        try {

            let result = await Course.deleteOne({ id: req.body.id})

            console.log({ result })

            res.status(result.deletedCount > 0 ? 202 : 406).send({ message: result.deletedCount > 0 ? defaultMessages.COURSE_DELETED : defaultMessages.COURSE_NOT_DELETED });

        }
        catch (e) {
            res.status(400).send({ message: e.toString() });
        }
    }
}

let getAllCourse = async (req, res) => {
    try {

        let query = {};

        let sortType = req.query.sortType ? req.query.sortType : "id";
        let sortDirection = req.query.sortDirection ? parseFloat(req.query.sortDirection) : 1;

        let items = req.query.page ? (req.query.items ? parseFloat(req.query.items) : config.ITEMS_PER_PAGE) : 0;
        let page = req.query.page ? parseFloat(req.query.page) : 0;

        let courses = await Course.find(query)
            .select('-__v -_id')
            .collation({ locale: "en" })
            .sort({ [sortType]: sortDirection })
            .limit(items)
            .skip((page - 1) * items);

        res.status(200).send(courses);
    }
    catch (e) {
        res.status(400).send({ message: e.toString() });
    }
}

module.exports = {
    addCourse,
    editCourse,
    deleteCourse,
    getAllCourse
}