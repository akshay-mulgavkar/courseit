const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const topicSchema = new mongoose.Schema({
    topicTitle: {
        type: String,
        required: true
    },
    topicDesc: {
        type: String,
        required: true
    },
    // courseID: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Course',
    //     required: true,
    // }
})

topicSchema.plugin(autoIncrement.plugin, { model: 'Topic', field: 'id' });

module.exports = {
    Topic: mongoose.model('Topic', topicSchema)
}