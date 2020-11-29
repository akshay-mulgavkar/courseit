const validations = require('../validations/topics')
const { Topic } = require('../models/topics')
const defaultMessages = require('../utility/defaultMessages')
const config = require('../utility/config');
const moment = require('moment')

let addTopic = async (req, res) => {

    const validation = validations.addTopic.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message });
    } else {
        try {

            let topic = await Topic.findOne({ topicTitle: req.body.topicTitle });
            if (topic) return res.status(409).send({ message: defaultMessages.TOPIC_ALREADY_PRESENT });

            let data = req.body

            topic = new Topic(data);

            await topic.save();

            res.status(201).json({ message: defaultMessages.TOPIC_ADDED, topic });

        } catch (e) {
            res.status(400).send({ message: e.toString() });
        }
    }
}

let editTopic = async (req, res) => {

    const validation = validations.editTopic.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message });
    } else {

        try {

            let topic = await Topic.findOne({ id: req.body.id });
            if (!topic) return res.status(400).send({ message: defaultMessages.TOPIC_NOT_PRESENT });

            let result = await topic.updateOne(req.body)

            topic = await Topic.findOne({ id: req.body.id }).select('-__v -_id')

            res.status(result.nModified > 0 ? 202 : 406).send({ message: result.nModified > 0 ? defaultMessages.TOPIC_UPDATED : defaultMessages.TOPIC_NOT_UPDATED, topic });

        }
        catch (e) {
            res.status(400).send({ message: e.toString() });
        }
    }
}


let deleteTopic = async (req, res) => {

    const validation = validations.modifyTopic.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message });
    } else {

        try {

            let result = await Topic.deleteOne({ id: req.body.id})

            console.log({ result })

            res.status(result.deletedCount > 0 ? 202 : 406).send({ message: result.deletedCount > 0 ? defaultMessages.TOPIC_DELETED : defaultMessages.TOPIC_NOT_DELETED });

        }
        catch (e) {
            res.status(400).send({ message: e.toString() });
        }
    }
}
let getAllTopics = async (req, res) => {
    try {

        let query = {};

        let sortType = req.query.sortType ? req.query.sortType : "id";
        let sortDirection = req.query.sortDirection ? parseFloat(req.query.sortDirection) : 1;

        let items = req.query.page ? (req.query.items ? parseFloat(req.query.items) : config.ITEMS_PER_PAGE) : 0;
        let page = req.query.page ? parseFloat(req.query.page) : 0;

        let topic = await Topic.find(query)
            .select('-__v -_id')
            .collation({ locale: "en" })
            .sort({ [sortType]: sortDirection })
            .limit(items)
            .skip((page - 1) * items);

        res.status(200).send(topic);
    }
    catch (e) {
        res.status(400).send({ message: e.toString() });
    }
}

module.exports = {
    addTopic,
    editTopic,
    deleteTopic,
    getAllTopics
}